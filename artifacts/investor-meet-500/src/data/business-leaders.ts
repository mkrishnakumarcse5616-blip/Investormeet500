export type BusinessLeaderRegion =
  | 'Chennai'
  | 'Coimbatore'
  | 'Western Tamil Nadu'
  | 'Southern Tamil Nadu'
  | 'Other Tamil Nadu';

export type BusinessLeader = {
  id: string;
  name: string;
  company: string;
  region: BusinessLeaderRegion;
  sector: string;
  initials: string;
};

type LeaderRow = [name: string, company: string, region: BusinessLeaderRegion, sector: string];

const leaderRows: LeaderRow[] = [
  ['Venu Srinivasan', 'TVS Motor', 'Chennai', 'Industrialists & business groups'],
  ['Sudarshan Venu', 'TVS Motor', 'Chennai', 'Industrialists & business groups'],
  ['R. Dinesh', 'TVS Supply Chain Solutions', 'Chennai', 'Industrialists & business groups'],
  ['Gopal Srinivasan', 'TVS Capital Funds', 'Chennai', 'Industrialists & business groups'],
  ['Mallika Srinivasan', 'TAFE', 'Chennai', 'Industrialists & business groups'],
  ['Lakshmi Venu', 'Sundaram-Clayton', 'Chennai', 'Industrialists & business groups'],
  ['M. M. Murugappan', 'Murugappa Group', 'Chennai', 'Industrialists & business groups'],
  ['M. A. M. Arunachalam', 'Murugappa Group', 'Chennai', 'Industrialists & business groups'],
  ['Arun Murugappan', 'Murugappa Group', 'Chennai', 'Industrialists & business groups'],
  ['Vellayan Subbiah', 'Cholamandalam / Murugappa', 'Chennai', 'Industrialists & business groups'],
  ['P. R. Venketrama Raja', 'Ramco Group', 'Chennai', 'Industrialists & business groups'],
  ['N. Srinivasan', 'India Cements', 'Chennai', 'Industrialists & business groups'],
  ['N. Sankar', 'Sanmar Group', 'Chennai', 'Industrialists & business groups'],
  ['Vijay Sankar', 'Sanmar Group', 'Chennai', 'Industrialists & business groups'],
  ['A. C. Muthiah', 'SPIC / MAC Group', 'Chennai', 'Industrialists & business groups'],
  ['Ashwin Muthiah', 'AM International', 'Chennai', 'Industrialists & business groups'],
  ['R. G. Chandramogan', 'Hatsun Agro', 'Chennai', 'Industrialists & business groups'],
  ['R. G. Arun', 'Hatsun Agro', 'Chennai', 'Industrialists & business groups'],
  ['C. K. Ranganathan', 'CavinKare', 'Chennai', 'Industrialists & business groups'],
  ['T. T. Jagannathan', 'TTK Group', 'Chennai', 'Industrialists & business groups'],
  ['T. T. Raghunathan', 'TTK Group', 'Chennai', 'Industrialists & business groups'],
  ['Rahul Mammen Mappillai', 'MRF', 'Chennai', 'Industrialists & business groups'],
  ['Kalanithi Maran', 'Sun Group', 'Chennai', 'Industrialists & business groups'],
  ['Kavery Kalanithi', 'Sun Group', 'Chennai', 'Industrialists & business groups'],
  ['R. Thyagarajan', 'Shriram Group', 'Chennai', 'Industrialists & business groups'],
  ['Sridhar Vembu', 'Zoho', 'Chennai', 'Technology & digital business'],
  ['Radha Vembu', 'Zoho', 'Chennai', 'Technology & digital business'],
  ['Sekar Vembu', 'Zoho', 'Chennai', 'Technology & digital business'],
  ['Kumar Vembu', 'GoFrugal / Zoho', 'Chennai', 'Technology & digital business'],
  ['Girish Mathrubootham', 'Freshworks', 'Chennai', 'Technology & digital business'],
  ['Shan Krishnasamy', 'Freshworks', 'Chennai', 'Technology & digital business'],
  ['Suresh Sambandam', 'Kissflow', 'Chennai', 'Technology & digital business'],
  ['Murugavel Janakiraman', 'Matrimony.com', 'Chennai', 'Technology & digital business'],
  ['Krish Subramanian', 'Chargebee', 'Chennai', 'Technology & digital business'],
  ['Rajaraman Santhanam', 'Chargebee', 'Chennai', 'Technology & digital business'],
  ['Saravana Kumar', 'Kovai.co', 'Chennai', 'Technology & digital business'],
  ['Arun Jain', 'Intellect Design Arena', 'Chennai', 'Technology & digital business'],
  ['B. K. Syngal', 'Sify Technologies', 'Chennai', 'Technology & digital business'],
  ['Karthik Jayaraman', 'WayCool', 'Chennai', 'Technology & digital business'],
  ['Sanjay Dasari', 'WayCool', 'Chennai', 'Technology & digital business'],
  ['Gaurav Kumar', 'Yubi', 'Chennai', 'Technology & digital business'],
  ['Satyam Kumar', 'Yubi', 'Chennai', 'Technology & digital business'],
  ['M. R. Rangaswami', 'Indiaspora / Sand Hill Group', 'Chennai', 'Technology & digital business'],
  ['Amitabh Satyam', 'Smart Transformations', 'Chennai', 'Technology & digital business'],
  ['Umesh Sachdev', 'Uniphore', 'Chennai', 'Technology & digital business'],
  ['Ravi Saraogi', 'Uniphore', 'Chennai', 'Technology & digital business'],
  ['Srinath Ravichandran', 'Agnikul Cosmos', 'Chennai', 'Technology & digital business'],
  ['Moin SPM', 'Agnikul Cosmos', 'Chennai', 'Technology & digital business'],
  ['Agnishwar Jayaprakash', 'Garuda Aerospace', 'Chennai', 'Technology & digital business'],
  ['V. S. S. Mani', 'Justdial', 'Chennai', 'Technology & digital business'],
  ['K. P. Ramasamy', 'KPR Mill', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['K. P. D. Sigamani', 'KPR Mill', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['P. Nataraj', 'KPR Mill', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['G. Soundararajan', 'Suguna Foods', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['B. Soundararajan', 'Suguna Foods', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['M. Manickam', 'Sakthi Group', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['M. Srinivasan', 'Sakthi Group', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Vanitha Mohan', 'Pricol', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Vikram Mohan', 'Pricol', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Jairam Varadaraj', 'Elgi Equipments', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Jayaram Varadaraj', 'Elgi Group', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Ravi Sam', 'Lakshmi Machine Works', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['G. K. Sundaram', 'Lakshmi Mills', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Rajshree Pathy', 'Rajshree Sugars', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['Nalla G. Palaniswami', 'KMCH', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['G. Bakthavathsalam', 'KG Hospital', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['K. Easwaran', 'Sakthi Gear Products', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['K. Shanmuga Sundaram', 'Sakthi Gear Products', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['K. G. Balakrishnan', 'KG Group', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['S. K. M. Maeilanandhan', 'SKM Group', 'Coimbatore', 'Industrialists & entrepreneurs'],
  ['K. R. Nagarajan', 'Ramraj Cotton', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['A. Sakthivel', 'Poppys Knitwear', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['T. K. Chandiran', 'The Chennai Silks', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['K. M. Subramanian', 'Tiruppur Exporters Association / Textile Business', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['P. S. Sundaram', 'Pothys', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['V. R. Muthu', 'Idhayam', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['S. K. M. Siddha', 'SKM Group', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['C. K. Kumaravel', 'Naturals Salon', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['Veena Kumaravel', 'Naturals Salon', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['Arunachalam Muruganantham', 'Jayashree Industries', 'Western Tamil Nadu', 'Textiles & consumer business'],
  ['A. D. Padmasingh Isaac', 'Aachi Group', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Prathap C. Reddy', 'Apollo Hospitals', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Preetha Reddy', 'Apollo Hospitals', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Suneeta Reddy', 'Apollo Hospitals', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Shobana Kamineni', 'Apollo Hospitals', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Sangita Reddy', 'Apollo Hospitals', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['P. R. Ramasubrahmaneya Rajha', 'Ramco Group', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Nalli Kuppuswami Chetti', 'Nalli Silks', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['K. M. Mammen Mappillai', 'MRF', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['T. V. Sundram Iyengar', 'TVS Group', 'Southern Tamil Nadu', 'Healthcare & regional business'],
  ['Shiv Nadar', 'HCL', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['Roshni Nadar Malhotra', 'HCL', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['M. G. Muthu', 'MGM Group', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['V. G. Santhosam', 'VGP Group', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['H. Vijay Vasanth', 'Vasanth & Co', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['P. C. Duraisamy', 'Sakthi Masala', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['Shanthi Duraisamy', 'Sakthi Masala', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['M. P. Purushothaman', 'Empee Group', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['P. Subramanian', 'Shanthi Gears', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
  ['Karumuttu T. Kannan', 'Thiagarajar Group', 'Other Tamil Nadu', 'Tamil Nadu business leaders'],
];

export const businessLeaders: BusinessLeader[] = leaderRows.map(
  ([name, company, region, sector], index) => ({
    id: String(index + 1).padStart(3, '0'),
    name,
    company,
    region,
    sector,
    initials: name
      .replace(/[.'’]/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase(),
  }),
);

export const businessLeaderRegions = [
  'All regions',
  'Chennai',
  'Coimbatore',
  'Western Tamil Nadu',
  'Southern Tamil Nadu',
  'Other Tamil Nadu',
] as const;

export const featuredBusinessLeaderIds = ['001', '026', '082', '051', '081', '085', '091', '005'];
