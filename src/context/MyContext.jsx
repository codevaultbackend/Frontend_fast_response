import { createContext, useState, useEffect } from "react";
import assets from "../../public/assets/asstes";

const MyContext = createContext({});

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(null);

   const serviceCardData = [
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971584/fast_response_service/ys3ioq8768coqwi63qjl.png",
      title: "Fabrication & Installation",
      ratting: assets.rattingstar,
      price: 34,
      serviceType: "Fabrication",
      specialization: ["fabricator", "welder"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971580/fast_response_service/tee2ciatiqmacf2btxfh.png",
      title: "Shutter Making, Installation & Service",
      ratting: assets.rattingstar,
      price: 45,
      serviceType: "Shutter Work",
      specialization: ["fabricator", "mechanic"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/ljtjld56ikcpltbb1ylp.png",
      title: "M.S Fabrication & Grill Gate Fabrication",
      ratting: assets.rattingstar,
      price: 55,
      serviceType: "Metal Fabrication",
      specialization: ["fabricator", "welder"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971585/fast_response_service/wxb7bcvt3zb8czegt0tk.png",
      title: "Tin Shade / Factory Shade Installation",
      ratting: assets.rattingstar,
      price: 25,
      serviceType: "Shade Installation",
      specialization: ["fabricator", "construction"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971580/fast_response_service/vh8roo1rho5og72rz3uz.png",
      title: "Aluminium Door, Window & Cabin Installation",
      ratting: assets.rattingstar,
      price: 40,
      serviceType: "Aluminium Work",
      specialization: ["aluminium technician", "fabricator"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/bf3yknopx1qbdxis2uz1.png",
      title: "SS Welding Work",
      ratting: assets.rattingstar,
      price: 38,
      serviceType: "Welding",
      specialization: ["welder", "fabricator"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/ppufns8a15uuporvwot8.png",
      title: "Racks & Shelves Installation Work",
      ratting: assets.rattingstar,
      price: 30,
      serviceType: "Installation",
      specialization: ["carpenter", "fabricator"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/ulzn3bj2jwkts2wempaf.png",
      title: "Interior & Furniture",
      ratting: assets.rattingstar,
      price: 60,
      serviceType: "Interior Work",
      specialization: ["carpenter", "interior designer"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971583/fast_response_service/h2rzullwj2rycnsasjay.png",
      title: "Modular Kitchen Work",
      ratting: assets.rattingstar,
      price: 50,
      serviceType: "Kitchen Work",
      specialization: ["carpenter", "interior designer"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/a2smwevd4ntpksl6jn7u.png",
      title: "Furniture Work",
      ratting: assets.rattingstar,
      price: 28,
      serviceType: "Carpentry",
      specialization: ["carpenter"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971605/fast_response_service/g7zvuklidlizf4erhrti.png",
      title: "Carpenter Services",
      ratting: assets.rattingstar,
      price: 70,
      serviceType: "Carpentry",
      specialization: ["carpenter"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/fpk7wuhsybha2tfki3b9.png",
      title: "PVC Paneling & Wallpaper Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Home Decor",
      specialization: ["painter", "interior designer"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/u3nwmxfq4cca4ibwfr15.png",
      title: "Glass Window, Door & Paneling Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Glass Work",
      specialization: ["glass technician", "aluminium technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/elhyod98f6lers1ispnw.png",
      title: "Home & Building Improvement",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Construction",
      specialization: ["construction", "civil worker"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/tpjbkknfljekx2uhsb7p.png",
      title: "Paint & Putty Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Painting",
      specialization: ["painter"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/xapnncfuhnt7s1czrknj.png",
      title: "Tiles, Kota & Granite Installation & Polishing",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Tile Work",
      specialization: ["tile worker", "mason"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971584/fast_response_service/k9ueq8jwuhe4gzbq7xy1.png",
      title: "Building Construction Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Construction",
      specialization: ["construction", "civil worker"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971599/fast_response_service/uik865sdfgqkhgeggy3l.png",
      title: "Core Cutting Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Cutting Work",
      specialization: ["construction", "core cutter"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/igenhywkkunycuvlepfh.png",
      title: "Awning Shade Work",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Shade Work",
      specialization: ["fabricator"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/lgdhri5vijwtr46jtguf.png",
      title: "Electrical & Mechanical Services",
      ratting: assets.rattingstar,
      cateogory: "MostBooked",
      price: 15,
      serviceType: "Electrical",
      specialization: ["electrician", "mechanic"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/lgdhri5vijwtr46jtguf.png",
      title: "Electrical Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Electrical",
      specialization: ["electrician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/kyf7ngww3damdxxbkwmk.png",
      title: "Plumbing Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Plumbing",
      specialization: ["plumber"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/ipyb2btfxrrnfi3gv8z3.png",
      title: "AC Installation & Services",
      ratting: assets.rattingstar,
      cateogory: "MostBooked",
      price: 15,
      serviceType: "AC Repair",
      specialization: ["actechnician", "hvac"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/iaxb7ladmbn9ae8opoqx.png",
      title: "HVAC Work",
      ratting: assets.rattingstar,
      cateogory: 'TopCategories',
      price: 15,
      serviceType: "HVAC",
      specialization: ["hvac"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/htwwmffmsglpuvpnqtvb.png",
      title: "Transformer Oil Filtration Work",
      ratting: assets.rattingstar,
      cateogory: "MostBooked",
      price: 15,
      serviceType: "Electrical Industrial",
      specialization: ["electrician", "industrial technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971584/fast_response_service/n3wjhkaoq1uw8tvsepcn.png",
      title: "Safety & Security",
      ratting: assets.rattingstar,
      cateogory: 'TopCategories',
      price: 15,
      serviceType: "Security",
      specialization: ["securitytechnician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971602/fast_response_service/sso7gscmsjsb0ja4vd0c.png",
      title: "Fire Alarm Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Fire Alarm",
      specialization: ["fire technician", "security technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971592/fast_response_service/ewfvfbkf6vcdkfc9wcjh.png",
      title: "Fire Fighting Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Fire Fighting",
      specialization: ["fire technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/ndzrrdot6dem3ppfk0s9.png",
      title: "CCTV Security Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Security",
      specialization: ["cctv technician", "security technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/c1zcj7jdyugx6iqhiet0.png",
      title: "Sustainable & Outdoor",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Outdoor Work",
      specialization: ["gardener", "maintenance technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/mealsp4lvzznmqxoxbnv.png",
      title: "Solar Plant Installation & Maintenance",
      ratting: assets.rattingstar,
      cateogory: "MostBooked",
      price: 15,
      serviceType: "Solar",
      specialization: ["solar technician", "electrician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971582/fast_response_service/qmfp0eiyoo3rpfbtjplb.png",
      title: "Horticulture Services",
      cateogory: 'TopCategories',
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Gardening",
      specialization: ["gardener"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971607/fast_response_service/d4huezzjzeowaq1v08ue.png",
      title: "Specialized & Industrial",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Industrial",
      specialization: ["industrial technician"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971581/fast_response_service/ojtam16zmuadggq4zxnj.png",
      title: "Automobile Services",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Auto Repair",
      specialization: ["mechanic"],
    },
    {
      cardIcon:
        "https://res.cloudinary.com/athratech/image/upload/v1763971587/fast_response_service/i1wkzyghqf7fe2ttgg9c.png",
      title: "Body Maker",
      cateogory: "MostBooked",
      ratting: assets.rattingstar,
      price: 15,
      serviceType: "Automobile Fabrication",
      specialization: ["body maker", "mechanic"],
    },
  ];
const [searchQuery, setSearchQuery] = useState("");

  return <MyContext.Provider value={{ state,  searchQuery, setSearchQuery, serviceCardData}}>{children}</MyContext.Provider>;
};

export default MyContext;
