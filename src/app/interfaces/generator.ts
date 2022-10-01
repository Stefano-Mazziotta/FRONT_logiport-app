export interface IGenerator {
    IdGenerator: string
    IdBoat: string
    Quantity: string
    Brand: string
    NumberGenerator: number
    Model: string
    Type: string
    Power: string
    TimeSave: number
    TimeLastUpdate: number
    IsDeleted: boolean
    TimeDeleted: number    
}

export interface ICreateGeneratorDTO {
    idBoat: string
    quantity: string
    brand: string
    numberGenerator: number
    model: string
    type: string
    power: string
}

export interface IUpdateGeneratorDTO extends ICreateGeneratorDTO {
    idGenerator: string
}

export interface IGetAllGeneratorsDTO {
    idCompany:string
    idBoat: string
}

export interface ISearchGeneratorDTO extends IGetAllGeneratorsDTO {
    numberGenerator:number
}

interface IResponse {
    status: number
    type: string
    message: string
}

export interface IResponseListGenerator extends IResponse {
    data: IGenerator[]
}

export interface IResponseOneGenerator extends IResponse {
    data: IGenerator
}

export interface IResponseNullData extends IResponse {
    data: null
}