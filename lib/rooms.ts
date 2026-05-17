// Shared room data — used by both RoomStack (client) and Checkout (server)

export const ROOMS = [
  {
    id: 1,
    name: 'THE AMAN VILLA',
    price: '฿45,000',
    priceNum: 45000,
    desc: 'สระว่ายน้ำส่วนตัวแบบอินฟินิตี้พร้อมวิวอ่าวพังงา สัมผัสประสบการณ์การต้อนรับระดับโลกแบบไทยที่ซึ่งสถาปัตยกรรมมินิมอลแบบดิบเท่มาบรรจบกับความหรูหราสไตล์เขตร้อน',
    suitability: '98%',
    amenities: ['เตียงคิงไซส์', '85 ตร.ม.', 'วิวภูเขาและทะเล'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOPhMAejMFbgw0YEpA9g9zCXV4FyiS7Ty4wA82la-oii171IVyuZ_eJ4evuwvlr-8MgfmYeyM_tOo-XQx80UVqbOZ9-8dCykGdDEoKa-qnnv0v2bnygLRvsyVILiqz_1sPJJyrs_wSego97jq4xkx5sa_aDd1ZRm4e--5YlIkTU8Ap18IkXFFacIc9xcmgXvPrteM9FOVdk-Mk0ow-qZcTsqlimpYfjOx_-r19Z2NCTeXq1ffzeHufw_l9A8Db-r9qoufFHRIhisTc',
    location: 'Phuket, Thailand',
  },
  {
    id: 2,
    name: 'SILVER MOON SUITE',
    price: '฿32,000',
    priceNum: 32000,
    desc: 'ห้องสวีทสุดหรูพร้อมทิวทัศน์ยามค่ำคืนที่งดงาม การออกแบบเน้นความสงบและเรียบง่าย เข้าถึงความเป็นส่วนตัวอย่างสมบูรณ์แบบ',
    suitability: '92%',
    amenities: ['เตียงคิงไซส์', '60 ตร.ม.', 'วิวเมืองกลางคืน'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuLZARWOF_ZGci-5WAI6AQ2vk9oMYE0zseTMW2x9GAWOjiaD6MHLYSAAjTZaxqyNxNeniCl-I96J2rcj-vLqG6NHRaDEMnVQ7m1W_7czr2PSYXeXHiiAdxsv4clkVTjMI6nMrHj-63zT78RTlllhzD5OuYSTYx1gl6_CpmYdmtFu5sJdCDDcx_PdylQWTFDXFLy4VpZmVHgR7KC6Hv0U1bpbJQvVqoKdOrd9nep4C31tbHcj6nlpHCp4-CeKCK_R6XnN5q3vAxeadR',
    location: 'Bangkok, Thailand',
  },
  {
    id: 3,
    name: 'OBSIDIAN LOFT',
    price: '฿28,000',
    priceNum: 28000,
    desc: 'สัมผัสความดิบเท่ของ Loft ที่ใช้วัสดุหินภูเขาไฟและคอนกรีตเปลือย เหมาะสำหรับการพักผ่อนแบบฉีกกฎเกณฑ์เดิมๆ',
    suitability: '85%',
    amenities: ['เตียงควีนไซส์', '55 ตร.ม.', 'ดีไซน์ลอฟท์'],
    image: 'https://lh3.googleusercontent.com/aida/ADBb0uj8TXdhblI92dtMVT_07dUCKc-qVoIr4GX_8I5t1sTteUG4oDM2FxXRKePs4mY5ANiPcnd7xVjf9clo1oKmMLQV_FSvfuJJjf_aNoz65GLieqfjV4Xmi0V-wa9xHt4MGA1UW-lyXtO1HykdcxNlkHx-KYQpWTLtFlN5-z1E0HwoXU7WOYtmzaV2naeBmtNFvuRDP73DAllUca_XnUp-lEDBhwPzRcy9Z2HcTkG2hjozO7VWUGAZoz_KjkY',
    location: 'Chiang Mai, Thailand',
  }
];

export type Room = (typeof ROOMS)[number];
