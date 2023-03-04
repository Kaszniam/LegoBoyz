import {
  BufferAttribute,
  BufferGeometry,
  Color as ThreeColor,
  DoubleSide,
  Material,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from "three";
import {
  Color,
  FlatMesh,
  IfcAPI,
  IFCBUILDINGELEMENTPROXY,
  PlacedGeometry,
} from "web-ifc";

export class GeometryConverterService {
  public async getMeshesFromURL(url: string): Promise<Record<string, Mesh>> {
    const ifcApi = new IfcAPI();
    ifcApi.SetWasmPath("/");
    await ifcApi.Init();
    let response = await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        return new File([blob], "input.ifc", { type: "application/pdf" });
      });
    let object = await this.getFileBuffer(response).then((e) => e);
    ifcApi.OpenModel(object);
    return this.getMeshes(ifcApi);
  }

  public getMeshes(ifcApi: IfcAPI, modelID: number = 0): Record<string, Mesh> {
    const meshes: Record<string, Mesh> = {};
    ifcApi.StreamAllMeshes(
      modelID,
      async (flatMesh: FlatMesh) => {
        const mesh = this.getMesh(modelID, ifcApi, flatMesh);
        const guid = ifcApi.GetLine(modelID, flatMesh.expressID).GlobalId.value;
        meshes[guid] = mesh;
      }
    );
    return meshes;
  }

  private getMesh(modelID: number, ifcApi: IfcAPI, flatMesh: FlatMesh): Mesh {
    const placedGeometry = flatMesh.geometries.get(0);
    const geometry = this.getBufferGeometry(modelID, ifcApi, placedGeometry);
    const material = this.getMeshMaterial(placedGeometry.color);
    const mesh = new Mesh(geometry, material);
    mesh.matrix = this.getMeshMatrix(placedGeometry.flatTransformation);
    mesh.matrixAutoUpdate = false;
    return mesh;
  }

  private getBufferGeometry(
    modelID: number,
    ifcApi: IfcAPI,
    placedGeometry: PlacedGeometry
  ): BufferGeometry {
    const geometry = ifcApi.GetGeometry(
      modelID,
      placedGeometry.geometryExpressID
    );
    const verts = ifcApi.GetVertexArray(
      geometry.GetVertexData(),
      geometry.GetVertexDataSize()
    );
    const indices = ifcApi.GetIndexArray(
      geometry.GetIndexData(),
      geometry.GetIndexDataSize()
    );
    return this.ifcGeometryToBuffer(placedGeometry.color, verts, indices);
  }

  private getMeshMatrix(matrix: Array<number>): Matrix4 {
    const mat = new Matrix4();
    mat.fromArray(matrix);
    return mat;
  }

  private getMeshMaterial(color: Color): Material {
    const col = new ThreeColor(color.x, color.y, color.z);
    return new MeshPhongMaterial({ color: col, side: DoubleSide });
  }

  private ifcGeometryToBuffer(
    color: Color,
    vertexData: Float32Array,
    indexData: Uint32Array
  ): BufferGeometry {
    const geometry = new BufferGeometry();
    let posFloats = new Float32Array(vertexData.length);
    let normFloats = new Float32Array(vertexData.length);
    let colorFloats = new Float32Array(vertexData.length);

    for (let i = 0; i < vertexData.length; i += 3) {
      posFloats[i + 0] = vertexData[i + 0];
      posFloats[i + 1] = vertexData[i + 1];
      posFloats[i + 2] = vertexData[i + 2];

      normFloats[i / 2 + 0] = vertexData[i + 3];
      normFloats[i / 2 + 1] = vertexData[i + 4];
      normFloats[i / 2 + 2] = vertexData[i + 5];

      colorFloats[i / 2 + 0] = color.x;
      colorFloats[i / 2 + 1] = color.y;
      colorFloats[i / 2 + 2] = color.z;
    }
    geometry.setAttribute("position", new BufferAttribute(posFloats, 3));
    geometry.setAttribute("normal", new BufferAttribute(normFloats, 3));
    geometry.setAttribute("color", new BufferAttribute(colorFloats, 3));
    geometry.setIndex(new BufferAttribute(indexData, 1));
    return geometry;
  }

  private async getFileBuffer(file: File): Promise<Uint8Array> {
    let fileBuffer = await this.readInputFile(file);
    return new Uint8Array(fileBuffer);
  }

  private async readInputFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = (e) =>
        resolve((e.target as FileReader).result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}

export const geometryConverter = new GeometryConverterService();
