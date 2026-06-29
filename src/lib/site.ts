export const SITE = {
  name: "Reddy Pharma",
  tagline: "Your Trusted Local Pharmacy in Bengaluru",
  phone: "+91 9502755997",
  phoneRaw: "+919502755997",
  whatsapp: "919502755997",
  email: "vishnu9502755@gmail.com",
  address: "#451/C, Shop No.2, 'A'Block, AECS Layout,kudlu, Bengaluru - 560068",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d826.7752007074937!2d77.64935954460253!3d12.884226718753533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15cfd5188cb3%3A0xe16129d13f6efd79!2sReddy%20pharmacy!5e0!3m2!1sen!2sin!4v1781847401615!5m2!1sen!2sin",
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
