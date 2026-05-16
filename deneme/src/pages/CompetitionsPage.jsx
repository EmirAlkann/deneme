import React from 'react';
import Competitions from '../components/Competitions';

export default function CompetitionsPage({ lang }) {
  const T = {
    tr: { title: 'Mücadeleler', desc: 'FTNCC olarak dünya çapındaki en prestijli liglerde ve turnuvalarda rekabet ediyoruz.' },
    en: { title: 'Competitions', desc: 'As FTNCC, we compete in the most prestigious leagues and tournaments worldwide.' },
  }[lang];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">{T.title}</h1>
          <p className="page-desc">{T.desc}</p>
        </div>
      </div>
      <Competitions lang={lang} />
    </div>
  );
}
