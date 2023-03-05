import {BACKEND_URL} from "../consts";
import axios from "axios";
import {Measurment} from "../domain/Measurment";
import {SegmentInfo} from "../domain/SegmentInfo";

export class ServerClientService {
    public async getMeasurementsForElement(rfid: string): Promise<Measurment[]> {
        return axios.get(`${BACKEND_URL}/measurements?rfid=${rfid}`)
    }

    public async getAllMeasurements(): Promise<Measurment[]> {
        return axios.get(`${BACKEND_URL}/measurements`)
    }

    public async getSegmentInfo(rfid: string): Promise<SegmentInfo> {
        return axios.get(`${BACKEND_URL}/segments/segmentInfo?rfid=${rfid}`)
    }
}