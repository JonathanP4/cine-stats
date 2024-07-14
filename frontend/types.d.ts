type UserData = {
    uid: string;
    name: string;
    email: string;
    photoURL: string | null;
};

type MediaTypes = "movie" | "tv" | "person";

type ResultsData = {
    page: number;
    results: MovieData[] | TvData[] | any;
    total_pages: number;
    total_results: number;
};

type MovieData = {
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type TvData = {
    backdrop_path: string;
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
};

type PeopleData = {
    id: number;
    name: string;
    original_name: string;
    media_type: string;
    adult: boolean;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
    known_for: MovieData[];
};

type Genres = { id: number; name: string };

type Companies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};

type ProductionCountries = {
    iso_3166_1: string;
    name: string;
};

type SpokenLanguage = { english_name: string; iso_639_1: string; name: string };

type SearchMovieData = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: Genres[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Companies[];
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type TimeFrames = "week" | "day";

type TimeFrameState = { movie: TimeFrames; tv: TimeFrames };
