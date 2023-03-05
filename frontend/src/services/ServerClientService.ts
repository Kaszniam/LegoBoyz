import {BACKEND_URL} from "../consts";
import axios from "axios";
import {Measurment} from "../domain/Measurment";
import {SegmentInfo} from "../domain/SegmentInfo";

export class ServerClientService {
    public async getMeasurementsForElement(rfid: string): Promise<Measurment[]> {
        const {data} = await axios.get<Measurment[]>(`http://${BACKEND_URL}/measurements?rfid=${rfid}`);
        return data
    }

    public async getAllMeasurements(): Promise<Measurment[]> {
        const {data} = await axios.get<Measurment[]>(`http://${BACKEND_URL}/measurements`);
        return data
    }

    public async getSegmentInfo(rfid: string): Promise<SegmentInfo> {
        const {data} = await axios.get<SegmentInfo>(`http://${BACKEND_URL}/segments/segmentInfo?rfid=${rfid}`);
        return data
    }
}

export const serverClientService = new ServerClientService()
