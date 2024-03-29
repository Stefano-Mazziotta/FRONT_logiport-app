export interface IExpiration {
    IdExpiration: string
    IdBoat: string
    Title: string
    Description: string
    ExpirationDate: number
    Status: string
    DaysToExpiration: number
    TimeSave: number
    TimeLastUpdate: number
    IsDeleted: boolean
    TimeDeleted: number
    InitDate: number
    InspectorCheck: number
    orderPrio: number
}

export interface ICreateExpirationDTO {
    idBoat: string
    title: string
    description: string
    expirationDate: number
    initDate: number
    inspectorCheck: number
}

export interface IUpdateExpirationDTO extends ICreateExpirationDTO {
    idExpiration: string
}

export interface IGetAllExpirationsDTO {
    idCompany: string
    idBoat: string
}

export interface ISearchExpirationDTO extends IGetAllExpirationsDTO {
    title: string
}

interface IResponse {
    status: number
    type: string
    message: string
}

export interface IResponseListExpiration extends IResponse {
    data: IExpiration[]
}

export interface IResponseOneExpiration extends IResponse {
    data: IExpiration
}

export interface IResponseNullData extends IResponse {
    data: null
}