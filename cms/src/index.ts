import type { Core } from '@strapi/strapi';

const PUBLIC_ACTIONS = [
  'api::club.club.find',
  'api::equipe.equipe.find',
  'api::equipe.equipe.findOne',
  'api::actualite.actualite.find',
  'api::actualite.actualite.findOne',
  'api::membre-bureau.membre-bureau.find',
  'api::membre-bureau.membre-bureau.findOne',
  'api::planning-entrainement.planning-entrainement.find',
  'api::planning-entrainement.planning-entrainement.findOne',
  'api::contact.contact.find',
  'api::global.global.find',
];

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    strapi.log.warn('Public role not found, skipping permission bootstrap');
    return;
  }

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        role: publicRole.id,
      },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }

  strapi.log.info('Public read permissions configured for content types');
}

async function seedIfEmpty(strapi: Core.Strapi) {
  const existingGlobal = await strapi.documents('api::global.global').findFirst();
  if (existingGlobal) {
    strapi.log.info('Seed skipped: content already present');
    return;
  }

  strapi.log.info('Seeding initial club content…');

  await strapi.documents('api::global.global').create({
    data: {
      nomClub: 'Basket Ball Brivadois',
      couleurPrimaire: '#0a0a0a',
      couleurAccent: '#e30613',
      accrocheAccueil:
        'Le basket amateur de Brioude — équipes, matchs et esprit de club.',
    },
  });

  await strapi.documents('api::club.club').create({
    data: {
      titre: 'Le Basket Ball Brivadois',
      accroche: 'Association sportive de basket à Brioude',
      presentation:
        'Le Basket Ball Brivadois regroupe les passionnés de basket de Brioude et des environs.\n\nDu baby-basket aux seniors, le club propose un encadrement bienveillant, des compétitions locales et une vraie vie associative.',
      historique:
        'Fondé pour faire vivre le basket brivadois, le club continue de grandir grâce à ses bénévoles, ses coachs et ses familles.',
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::contact.contact').create({
    data: {
      adresse: 'Gymnase municipal\nBrioude, Haute-Loire',
      email: 'contact@bbb-exemple.fr',
      telephone: '04 00 00 00 00',
      gymnase: 'Gymnase de Brioude',
      horairesSecretariat: 'Sur rendez-vous',
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  const seniors = await strapi.documents('api::equipe.equipe').create({
    data: {
      nom: 'Seniors Hommes',
      slug: 'seniors-hommes',
      categorie: 'Seniors hommes',
      description: 'Équipe fanion du club en championnat régional.',
      ordre: 1,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  const u15 = await strapi.documents('api::equipe.equipe').create({
    data: {
      nom: 'U15',
      slug: 'u15',
      categorie: 'U15',
      description: 'Formation et compétition pour les jeunes du club.',
      ordre: 2,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::planning-entrainement.planning-entrainement').create({
    data: {
      jour: 'Mardi',
      heureDebut: '20:00:00.000',
      heureFin: '22:00:00.000',
      lieu: 'Gymnase de Brioude',
      equipe: seniors.documentId,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::planning-entrainement.planning-entrainement').create({
    data: {
      jour: 'Mercredi',
      heureDebut: '18:00:00.000',
      heureFin: '19:30:00.000',
      lieu: 'Gymnase de Brioude',
      equipe: u15.documentId,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::membre-bureau.membre-bureau').create({
    data: {
      nom: 'Alex Martin',
      role: 'Président·e',
      bio: 'Placeholder — remplacez par les vrais membres du bureau.',
      ordre: 1,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::membre-bureau.membre-bureau').create({
    data: {
      nom: 'Sam Dupont',
      role: 'Secrétaire',
      ordre: 2,
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  await strapi.documents('api::actualite.actualite').create({
    data: {
      titre: 'Bienvenue sur le nouveau site du club',
      slug: 'bienvenue-nouveau-site',
      resume: 'Le Basket Ball Brivadois lance son site officiel.',
      contenu:
        'Nous sommes ravis de vous présenter le nouveau site du club.\n\nRetrouvez bientôt les actualités, le calendrier des matchs via Score\'n\'co, les équipes et le planning des entraînements.',
      datePublication: new Date().toISOString().slice(0, 10),
      publishedAt: new Date().toISOString(),
    },
    status: 'published',
  });

  strapi.log.info('Seed completed');
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    await seedIfEmpty(strapi);
  },
};
