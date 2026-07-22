export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type Global = {
  id: number;
  documentId: string;
  nomClub: string;
  couleurPrimaire?: string | null;
  couleurAccent?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  scorencoClubWidgetUrl?: string | null;
  accrocheAccueil?: string | null;
  logo?: StrapiMedia | null;
  heroImage?: StrapiMedia | null;
};

export type Club = {
  id: number;
  documentId: string;
  titre: string;
  accroche?: string | null;
  presentation: string;
  historique?: string | null;
  image?: StrapiMedia | null;
};

export type Categorie = {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  ordre?: number | null;
};

export type Equipe = {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  categorie?: Categorie | null;
  description?: string | null;
  scorencoWidgetUrl?: string | null;
  ordre?: number | null;
  photo?: StrapiMedia | null;
};

export type Actualite = {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  resume?: string | null;
  contenu: string;
  datePublication: string;
  image?: StrapiMedia | null;
};

export type MembreBureau = {
  id: number;
  documentId: string;
  nom: string;
  role: string;
  bio?: string | null;
  ordre?: number | null;
  photo?: StrapiMedia | null;
};

export type PlanningEntrainement = {
  id: number;
  documentId: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  notes?: string | null;
  equipe?: Equipe | null;
};

export type Contact = {
  id: number;
  documentId: string;
  adresse: string;
  email: string;
  telephone?: string | null;
  horairesSecretariat?: string | null;
  gymnase?: string | null;
  carteUrl?: string | null;
};
