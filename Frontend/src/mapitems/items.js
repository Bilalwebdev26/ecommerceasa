import { BarChart, icons, Lock, Mail, PlusCircle, ShoppingBasket, User } from "lucide-react";

export const signupItems = [
  {
    id: "fullName",
    placeholder: "Enter Name",
    label: "Full Name",
    icon: User,
    type: "text",
  },
  {
    id: "email",
    placeholder: "Enter Email",
    label: "Email",
    icon: Mail,
    type: "email",
  },
  {
    id: "password",
    placeholder: "Enter Password",
    label: "Enter Password",
    icon: Lock,
    type: "password",
  },
  {
    id: "confirmPassword",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    icon: Lock,
    type: "password",
  },
];

export const loginItems = [
  {
    id:"email",
    placeholder:"Enter Email",
    label:"Email",
    icon:Mail,
    type:"email"
  },
  {
    id:"password",
    placeholder:"Enter Password",
    label:"Password",
    icon:Lock,
    type:"password"
  }
]

export const categories = [
  {href:"/jeans",name:"Jeans",imageURL:"src/assets/jeans.jpg"},
  {href:"/t-shirts",name:"T-shirts",imageURL:"src/assets/tshirts.jpg"},
  {href:"/shoes",name:"Shoes",imageURL:"src/assets/shoes.jpg"},
  {href:"/glasses",name:"Glasses",imageURL:"src/assets/glasses.png"},
  {href:"/jackets",name:"Jackets",imageURL:"src/assets/jackets.jpg"},
  {href:"/suits",name:"Suits",imageURL:"src/assets/suits.jpg"},
  {href:"/bags",name:"Bags",imageURL:"src/assets/bags.jpg"}
]

export const adminTabs=[
  {id:"create",label:"Create Products",icon:PlusCircle},
  {id:"products",label:"Products",icon:ShoppingBasket},
  {id:"analytics",label:"Analytics",icon:BarChart}
]

export const categoriesOnly=[
  "jeans","t-shirts","shoes","glasses","jackets","suits","bags"
]

export const recommendations =[] 