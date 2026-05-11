export type TeamRoleKey =
  | 'founder'
  | 'generalCoordinator'
  | 'administrativeCoordinator'
  | 'departmentCoordinator'
  | 'unitCoordinator'
  | 'member';

export interface TeamPerson {
  name: string;
  roleKey: TeamRoleKey;
  image?: string;
  bioKey?: string;
}

export interface TeamUnit {
  slug: string;
  nameKey: string;
  coordinator: TeamPerson;
  members: TeamPerson[];
}

export interface TeamDepartment {
  slug: string;
  nameKey: string;
  descriptionKey: string;
  coordinator?: TeamPerson;
  units?: TeamUnit[];
  members?: TeamPerson[];
}

export interface TeamStructure {
  founder: TeamPerson;
  generalCoordinators: TeamPerson[];
  administrativeCoordinators: TeamPerson[];
  departments: TeamDepartment[];
}

const IMG = (slug: string) => `/images/team/${slug}.webp`;
const BIO = (slug: string) => `bios.${slug}`;

export const teamStructure: TeamStructure = {
  founder: {
    name: 'Halil Ecer',
    roleKey: 'founder',
    image: IMG('halil-ecer'),
    bioKey: BIO('halilEcer'),
  },
  generalCoordinators: [
    {
      name: 'Rümeysa Çakır',
      roleKey: 'generalCoordinator',
      image: IMG('rumeysa-cakir'),
      bioKey: BIO('rumeysaCakir'),
    },
    {
      name: 'Burak Mert Cömert',
      roleKey: 'generalCoordinator',
      image: IMG('burak-mert-comert'),
    },
  ],
  administrativeCoordinators: [
    {
      name: 'Eren Soylu',
      roleKey: 'administrativeCoordinator',
      image: IMG('eren-soylu'),
      bioKey: BIO('erenSoylu'),
    },
    {
      name: 'Ayşegül Dinçer',
      roleKey: 'administrativeCoordinator',
      image: IMG('aysegul-dincer'),
      bioKey: BIO('aysegulDincer'),
    },
    {
      name: 'Emir Aslan',
      roleKey: 'administrativeCoordinator',
      image: IMG('emir-aslan'),
    },
  ],
  departments: [
    {
      slug: 'project',
      nameKey: 'departments.project.name',
      descriptionKey: 'departments.project.description',
      units: [
        {
          slug: 'euProject',
          nameKey: 'units.euProject',
          coordinator: {
            name: 'İrem Demirci',
            roleKey: 'unitCoordinator',
            image: IMG('irem-demirci'),
            bioKey: BIO('iremDemirci'),
          },
          members: [
            {
              name: 'Fatma Nur Karagöz',
              roleKey: 'member',
              image: IMG('fatma-nur-karagoz'),
              bioKey: BIO('fatmaNurKaragoz'),
            },
            {
              name: 'Şerife Nur Kuş',
              roleKey: 'member',
              image: IMG('serife-nur-kus'),
              bioKey: BIO('serifeNurKus'),
            },
            {
              name: 'Yasemin Gürlek',
              roleKey: 'member',
              image: IMG('yasemin-gurlek'),
              bioKey: BIO('yaseminGurlek'),
            },
            { name: 'Melisa Kara', roleKey: 'member', bioKey: BIO('melisaKara') },
          ],
        },
        {
          slug: 'academy',
          nameKey: 'units.academy',
          coordinator: {
            name: 'Evren Sarı',
            roleKey: 'unitCoordinator',
            image: IMG('evren-sari'),
            bioKey: BIO('evrenSari'),
          },
          members: [
            {
              name: 'Hatice Rana Aktaş',
              roleKey: 'member',
              image: IMG('hatice-rana-aktas'),
              bioKey: BIO('haticeRanaAktas'),
            },
            {
              name: 'Ayşe Rana Selvitopu',
              roleKey: 'member',
              image: IMG('ayse-rana-selvitopu'),
              bioKey: BIO('ayseRanaSelvitopu'),
            },
          ],
        },
        {
          slug: 'socialResponsibility',
          nameKey: 'units.socialResponsibility',
          coordinator: {
            name: 'Münevver Ertürk',
            roleKey: 'unitCoordinator',
            image: IMG('munevver-erturk'),
            bioKey: BIO('munevverErturk'),
          },
          members: [
            {
              name: 'Ahmet Hakan Koşar',
              roleKey: 'member',
              image: IMG('ahmet-hakan-kosar'),
              bioKey: BIO('ahmetHakanKosar'),
            },
            {
              name: 'Buse Karadavut',
              roleKey: 'member',
              image: IMG('buse-karadavut'),
              bioKey: BIO('buseKaradavut'),
            },
          ],
        },
      ],
    },
    {
      slug: 'digitalMedia',
      nameKey: 'departments.digitalMedia.name',
      descriptionKey: 'departments.digitalMedia.description',
      units: [
        {
          slug: 'socialMedia',
          nameKey: 'units.socialMedia',
          coordinator: {
            name: 'Kübra Demir',
            roleKey: 'unitCoordinator',
            image: IMG('kubra-demir'),
            bioKey: BIO('kubraDemir'),
          },
          members: [
            {
              name: 'Sevda Rezaei',
              roleKey: 'member',
              image: IMG('sevda-rezaei'),
              bioKey: BIO('sevdaRezaei'),
            },
          ],
        },
        {
          slug: 'design',
          nameKey: 'units.design',
          coordinator: {
            name: 'Şeydanur Kavak',
            roleKey: 'unitCoordinator',
            image: IMG('seydanur-kavak'),
            bioKey: BIO('seydanurKavak'),
          },
          members: [
            {
              name: 'Aleyna Akgül',
              roleKey: 'member',
              image: IMG('aleyna-akgul'),
              bioKey: BIO('aleynaAkgul'),
            },
          ],
        },
      ],
    },
    {
      slug: 'organization',
      nameKey: 'departments.organization.name',
      descriptionKey: 'departments.organization.description',
      coordinator: {
        name: 'Mehmet Ali Şahin',
        roleKey: 'departmentCoordinator',
        image: IMG('mehmet-ali-sahin'),
      },
      members: [
        { name: 'Esma Sare Usta', roleKey: 'member', image: IMG('esma-sare-usta') },
        { name: 'Emirhan Aytemur', roleKey: 'member', image: IMG('emirhan-aytemur') },
      ],
    },
    {
      slug: 'press',
      nameKey: 'departments.press.name',
      descriptionKey: 'departments.press.description',
      units: [
        {
          slug: 'translation',
          nameKey: 'units.translation',
          coordinator: {
            name: 'Zeynepsu Gündoğan',
            roleKey: 'unitCoordinator',
            image: IMG('zeynepsu-gundogan'),
            bioKey: BIO('zeynepsuGundogan'),
          },
          members: [
            {
              name: 'Aybüke İdil Fidan',
              roleKey: 'member',
              bioKey: BIO('aybukeIdilFidan'),
            },
          ],
        },
        {
          slug: 'editorial',
          nameKey: 'units.editorial',
          coordinator: {
            name: 'Ayyüce Yılmaz',
            roleKey: 'unitCoordinator',
            image: IMG('ayyuce-yilmaz'),
            bioKey: BIO('ayyuceYilmaz'),
          },
          members: [],
        },
      ],
    },
  ],
};
