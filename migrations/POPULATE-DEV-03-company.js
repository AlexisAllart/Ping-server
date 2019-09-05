'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Companies', [{
      name: 'Insitaction Lille',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'contact@insitaction-lille.com',
      phone: '03 59 99 07 40',
      facebook: 'http://www.facebook.com/pages/ASTON-%C3%A9cole-dinformatique/234626209897365',
      twitter: 'http://twitter.com/#!/AstonEcole',
      linkedin: 'http://fr.linkedin.com/pub/aston-%C3%A9cole-d-informatique/37/b5b/a62',
      link: 'http://www.aston-ecole.com/',
      logo: './uploads/INSITACTION.png',
      about: 'INSITACTION, fondée il y a 14 ans, compte aujourd’hui plus de 40 collaborateurs passionnés et en veille sur les enjeux et innovations dédiés au commerce connecté.',
      address: '22 Rue de Bergues, 59000 Lille',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'GoWeb',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'goweb@contact.com',
      phone: '08 10 83 54 26',
      facebook: 'https://fr-fr.facebook.com/IBM.France/',
      twitter: 'https://twitter.com/ibm_france/',
      linkedin: 'https://www.linkedin.com/company/ibm/',
      link: 'https://www.ibm.com/fr-fr',
      logo: './uploads/GOWEB.png',
      about: 'Répondant à vos besoins, nos solutions mobilisent nos talents pour la réalisation de vos projets, le tout piloté en mode Agile depuis notre Centre de Services.',
      address: '36 Rue du Maréchal Foch, 59100 Roubaix',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'NeoWeb',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'contact@neoweb.fr',
      phone: '3936',
      facebook: 'https://fr-fr.facebook.com/afpa.hautsdefrance/',
      twitter: 'https://twitter.com/afpa_hdf',
      linkedin: 'https://www.linkedin.com/company/afpa/',
      link: 'https://www.afpa.fr/centre/centre-de-lille-lomme',
      logo: './uploads/NEOWEB.png',
      about: "Depuis 2004, nous accompagnons nos clients et partenaires sur des problématiques liées au développement de leur activité et à leur présence sur internet. Les réflexions menées en amont du développement sont primordiales quant à la réussite d’un projet web afin que la solution mise en place vous permette d’atteindre vos objectifs. Dans ce sens, nous vous proposons une démarche de co-construction et de conseil que nous avons développée en ayant pour volonté forte de se focaliser sur la création de valeur.",
      address: '165 Avenue de Bretagne, 59000 LILLE ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'MIS Group',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'contact@misgroup.fr',
      phone: '3936',
      facebook: 'https://fr-fr.facebook.com/afpa.hautsdefrance/',
      twitter: 'https://twitter.com/afpa_hdf',
      linkedin: 'https://www.linkedin.com/company/afpa/',
      link: 'https://www.afpa.fr/centre/centre-de-lille-lomme',
      logo: './uploads/MISGROUP.png',
      about: "MIS Group est une société spécialisée depuis 2001 dans les études quantitatives et qualitatives en France et à l'international. A travers nos 4 services - Made in Surveys, Made in Studios, On-Qual et Creatests - et une quarantaine de sites Internet d'informations, de création et d'animation de communautés online dont nous sommes propriétaires (en savoir plus sur nos Access-panels), nous proposons un large éventail de prestations à destination des responsables et chargés d'études, des chercheurs et des entrepreneurs.",
      address: '85 Rue Nationale, 59000 Lille',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eco Cup',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'contact@ecocup.fr',
      phone: '3936',
      facebook: 'https://fr-fr.facebook.com/afpa.hautsdefrance/',
      twitter: 'https://twitter.com/afpa_hdf',
      linkedin: 'https://www.linkedin.com/company/afpa/',
      link: 'https://www.afpa.fr/centre/centre-de-lille-lomme',
      logo: './uploads/MISGROUP.png',
      about: "Gobelets Réutilisables pour Promouvoir tous types d'Evènements ! Faites un Geste pour l'Environnement grâce au Gobelet Plastique Réutilisable ! Recyclable. Depuis 2008. Agréable au toucher. 100% certifié. Types: Gobelets réutilisables, Verres à Vin. Notre métier : nous fabriquons, vendons, louons et lavons des gobelets écologiques pour tous vos événements.",
      address: '85 rue Haddock, 59650 Villeneuve d\'Ascq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eco Alternativ',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'contact@ecoalternativ.fr',
      phone: '3936',
      facebook: 'https://fr-fr.facebook.com/afpa.hautsdefrance/',
      twitter: 'https://twitter.com/afpa_hdf',
      linkedin: 'https://www.linkedin.com/company/afpa/',
      link: 'https://www.afpa.fr/centre/centre-de-lille-lomme',
      logo: './uploads/ECOALTER.png',
      about: "Eco Alternativ’ vous propose des solutions de chauffage respectueuses de l’environnement en intégrant les énergies renouvelables au cœur de ses produits. Nous nous spécialisons notamment dans l’installation, mais également l’entretien et la réparation de poêles à granulés, d’inserts, de chaudières, de ballons thermodynamiques et de pompes à chaleur...",
      address: '3 rue de la République, 59113 Seclin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};