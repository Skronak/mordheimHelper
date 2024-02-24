import React, {PropsWithChildren, ReactNode} from "react";
import Header from "@/pages/Header";
import Footer from "@/pages/Footer";

type Props = {
  children: ReactNode;
  title?: string;
  readonly?: boolean;
  handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevious?: () => void;
}

export default function Layout(props: Props){

  return (
    <>
      <Header {...props}/>
      <div className="content-container">{props.children}</div>
      <Footer />
  </>
  )
}