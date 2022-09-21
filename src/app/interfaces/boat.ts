export interface IBoat {
    IdBoat: string;
    IdCompany: number
    BoatName: string
    Enrollment: string
    DistinguishingMark: string 
    HullMaterial: string
    BoatType: string
    Service: string
    SpecificExploitation: string
    EnrollmentDate: number
    ConstructionDate: number
    NAT: number
    NAN: number
    Eslora: number
    Manga: number
    Puntal: number
    PeopleTransported: number
    BoatPower: string
    ElectricPower: string
    IsDeleted: number | null
    TimeSave: number | null
    TimeDeleted: number | null
    TimeLastUpdate: number | null
}
    
export interface ICreateBoatDTO {
    idCompany: string
    boatName: string
    enrollment: string
    distinguishingMark: string
    hullMaterial: string
    boatType: string
    service: string
    specificExploitation: string
    enrollmentDate: number
    constructionDate: number
    nat: number
    nan: number
    eslora: number
    manga: number
    puntal: number
    peopleTransported: number
    boatPower: string
    electricPower: string
}

export interface IUpdateBoatDTO extends ICreateBoatDTO {
    idBoat: string
}

export interface ISearchBoatDTO {
    idCompany: string
    boatName: string
}

interface IResponse {
    status: number
    type: string
    message: string
}

export interface IResponseListBoat extends IResponse {
    data: IBoat[]
}

export interface IResponseOneBoat extends IResponse {
    data: IBoat
}

export interface IResponseNullData extends IResponse {
    data: null
}

export interface IBoatSelected {
    idBoat: string,
    boatName: string
}