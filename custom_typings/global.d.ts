import {Request} from "express";
import {ParamsDictionary} from "express-serve-static-core";

export {}

declare global {
    type Coordinates = {
        lat: number
        lon: number
    }

    type RequestWithCoordinates = Request<ParamsDictionary, object, object, Coordinates>

    type ObjectToStringQuery = {
        [Key: string]: string | number | boolean | object | ObjectToStringQuery
    }
}