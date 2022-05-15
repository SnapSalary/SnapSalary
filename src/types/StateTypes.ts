export type State = {

};

// type for company
export type CompanyProps = {
    id: number,
    name: string,
    state: string,
    country: string,
    industry_id: string,
    salary: number,

    // Data for image and card info
    imgUri1: string,
    imgAlt1: string,
    imgUri2: string,
    imgAlt2: string,

    exploreButtionClick: () => void
};
