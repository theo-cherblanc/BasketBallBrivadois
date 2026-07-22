# Basket Ball Brivadois

Site vitrine du club de basket amateur de Brioude, avec back-office Strapi et calendrier/résultats via Score'n'co.

## Prérequis

- **Node.js 20+** (recommandé : 22) — `nvm use` lit le [`.nvmrc`](.nvmrc)
- npm

## Structure

```
cms/   → Strapi 5 (API + admin)
web/   → Next.js (site public)
```

## Démarrage local

### 1. CMS (Strapi)

```bash
cd cms
nvm use   # si besoin
npm install
npm run develop
```

Au **premier lancement** :

1. Ouvre http://localhost:1337/admin
2. Crée le compte administrateur
3. Au bootstrap, Strapi :
   - ouvre la lecture publique des contenus
   - injecte un **seed** minimal (club, équipes, actus, bureau, contact, planning)

Admin : http://localhost:1337/admin  
API : http://localhost:1337/api

### 2. Site (Next.js)

Dans un second terminal :

```bash
cd web
nvm use
npm install
npm run dev
```

Site : http://localhost:3000

Variables ([`web/.env.example`](web/.env.example)) :

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Score'n'co (calendrier & résultats)

1. Connecte-toi à [scorenco.com/admin](https://www.scorenco.com/admin) (compte club)
2. Menu **Widgets** → crée / ouvre un widget (club ou équipe)
3. Copie le **code d'intégration** ou l'URL du type  
   `https://www.scorenco.com/widget/<ID>/`
4. Dans Strapi :
   - **Global** → champ `scorencoClubWidgetUrl` (page Calendrier)
   - **Équipe** → champ `scorencoWidgetUrl` (fiche équipe + calendrier)

Le front affiche le widget en iframe. Sans URL, un placeholder explique quoi faire.

## Contenus à éditer dans Strapi

| Type | Où ça s'affiche |
|------|-----------------|
| Global | Nom, accroche accueil, réseaux, widget club |
| Club | Page « Le club » |
| Catégorie | Liste gérée dans Strapi, liée aux équipes |
| Équipe | Liste / détail équipes |
| Actualité | Liste / détail actus |
| Membre du bureau | Page Bureau |
| Planning entraînement | Page Entraînements |
| Contact | Page Contact + mailto |

## Design

Charte alignée sur le logo : **noir** `#0a0a0a`, **rouge** `#e30613`, fond blanc. Logo dans [`web/public/logo-bbb.png`](web/public/logo-bbb.png).

## Déploiement (cible)

- `web` → Vercel avec `NEXT_PUBLIC_STRAPI_URL` pointant vers le CMS
- `cms` → Railway + Postgres + **Cloudinary** pour les médias

## Cloudinary (images en production)

Sans stockage externe, les uploads Strapi sur Railway ne survivent pas aux redéploiements. Cloudinary corrige ça.

### 1. Créer un compte

1. Inscris-toi sur [cloudinary.com](https://cloudinary.com) (offre gratuite suffisante pour le club)
2. Sur le **Dashboard**, note :
   - **Cloud name**
   - **API Key**
   - **API Secret**

### 2. Variables Railway (service Strapi)

```env
CLOUDINARY_NAME=ton_cloud_name
CLOUDINARY_KEY=ta_api_key
CLOUDINARY_SECRET=ton_api_secret
CLOUDINARY_FOLDER=bbb
```

Strapi bascule automatiquement sur Cloudinary dès que ces 3 variables sont définies. En local, sans elles, les fichiers restent dans `cms/public/uploads`.

### 3. Redéployer Strapi

Après ajout des variables → redéploiement Railway → teste un upload dans **Media Library** Strapi.

Les images apparaîtront avec une URL `https://res.cloudinary.com/...` et s'afficheront sur le site Vercel.
