import React, {useEffect, useState} from "react";
import {useDataStore} from "@/store/dataStore";
import Layout from "@/pages/Layout";

export default function AtlasPage() {
  const {appData} = useDataStore();

  return (
    <Layout title={'ATLAS'}>
      <div className={'list-army-page'}></div>
    </Layout>
  );
}
