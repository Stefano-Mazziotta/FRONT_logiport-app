export interface ICompany {
    IdCompany: string;
    RazonSocial: string;
    CUIT: number;
    IsDeleted: number;
    TimeSave: number | null;
    TimeLastUpdate: number | null;
    TimeDeleted: number | null;
}

export interface ICreateCompanyDTO {
    razonSocial: string,
    cuit: string
}

export interface IUpdateCompanyDTO {
    idCompany: string,
    razonSocial: string,
    cuit: string
}

export interface ISearchCompanyDTO {
    razonSocial: string
}

interface IResponse {
    status: number,
    type: string,
    message: string
}

export interface IResponseListCompany extends IResponse {
    data: ICompany[]
}

export interface IResponseOneCompany extends IResponse {
    data: ICompany
}

export interface IResponseNullData extends IResponse {
    data: null
}

export interface IcompanySelected {
    idCompany: string
    razonSocial: string
}

