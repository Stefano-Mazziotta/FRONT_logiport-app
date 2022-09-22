export interface IMotor {
    IdMotor: string
    IdBoat: string
    Quantity: string
    Brand: string
    NumberMotor: number
    Model: string
    Type: string
    Power: string
    Location: string
    TimeSave: number
    TimeLastUpdate: number
    IsDeleted: boolean
    TimeDeleted: number    
}

export interface ICreateMotorDTO {
    idBoat: string
    quantity: string
    brand: string
    numberMotor: number
    model: string
    type: string
    power: string
    location: string
}

export interface IUpdateMotorDTO extends ICreateMotorDTO {
    idMotor: string
}

export interface ISearchMotorDTO {
    idBoat: string
    numberMotor: string
}

interface IResponse {
    status: number
    type: string
    message: string
}

export interface IResponseListMotor extends IResponse {
    data: IMotor[]
}

export interface IResponseOneMotor extends IResponse {
    data: IMotor
}

export interface IResponseNullData extends IResponse {
    data: null
}