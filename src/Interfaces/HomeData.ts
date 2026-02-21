import { Vector3 } from "@minecraft/server";

export default interface HomeData {
    location: Vector3 | null;
    dimension: string | null;
}