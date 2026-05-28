export const initialData = {
  root: {},
  content: [
    {
      type: 'HeroLezione',
      props: {
        id: 'hero-barocco',
        titolo: 'Introduzione al Barocco',
        sottotitolo: 'Una pagina laboratorio per comporre lezioni Accordia con sezioni controllate e coerenti.'
      }
    },
    {
      type: 'CardContenuto',
      props: {
        id: 'card-contenuto',
        titolo: 'Una card Accordia',
        testo: 'Modifica questo testo nell editor. L obiettivo e verificare se Puck puo aiutare a comporre lezioni senza perdere il controllo del design.'
      }
    }
  ]
};

export const config = {
  components: {
    HeroLezione: {
      fields: {
        titolo: { type: 'text' },
        sottotitolo: { type: 'textarea' }
      },
      defaultProps: {
        titolo: 'Titolo della lezione',
        sottotitolo: 'Sottotitolo breve e chiaro.'
      },
      render: ({ titolo, sottotitolo }) => (
        <section className="accordia-hero-lab">
          <div className="accordia-eyebrow">Accordia Lab</div>
          <h1>{titolo}</h1>
          <p>{sottotitolo}</p>
        </section>
      )
    },
    CardContenuto: {
      fields: {
        titolo: { type: 'text' },
        testo: { type: 'textarea' }
      },
      defaultProps: {
        titolo: 'Titolo card',
        testo: 'Testo della card.'
      },
      render: ({ titolo, testo }) => (
        <article className="accordia-card-lab">
          <h2>{titolo}</h2>
          <p>{testo}</p>
        </article>
      )
    },
    SezioneAscolto: {
      fields: {
        titolo: { type: 'text' },
        descrizione: { type: 'textarea' },
        link: { type: 'text' }
      },
      defaultProps: {
        titolo: 'Ascolto guidato',
        descrizione: 'Inserisci consegna e domande guida.',
        link: ''
      },
      render: ({ titolo, descrizione, link }) => (
        <section className="accordia-listening-lab">
          <h2>{titolo}</h2>
          <p>{descrizione}</p>
          {link ? <a href={link}>Apri risorsa</a> : null}
        </section>
      )
    }
  }
};
