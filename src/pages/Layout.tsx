import React, {PropsWithChildren, ReactNode} from "react";
import Header from "@/pages/Header";
import Footer from "@/pages/Footer";

type Props = {
  children: ReactNode;
  title?: string;
}
export default function Layout(props: Props){

  return (
    <>
      <Header title={props.title}/>
      {props.children}
      <Footer />
  </>
  )
}