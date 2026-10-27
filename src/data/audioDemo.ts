export const AUDIO_DEMO_SRC = '/audio/sara-ukazka.mp3';

export type DemoLine = { t: number; kdo: 'zákazník' | 'Sára'; text: string };

export const audioDemoTranscript: DemoLine[] = [
  { t: 0, kdo: 'zákazník', text: 'Dobrý den, potřeboval bych nacenit novou koupelnu.' },
  { t: 4, kdo: 'Sára', text: 'Ráda. Jde o koupelnu v bytě, nebo v domě?' },
  { t: 9, kdo: 'zákazník', text: 'V bytě, panelák.' },
  { t: 12, kdo: 'Sára', text: 'Rozumím. Rovnou vám u stavbyvedoucího blokuji patnáctiminutový hovor na zítra v deset, hodí se?' },
  { t: 20, kdo: 'zákazník', text: 'Jo, to se hodí.' },
  { t: 23, kdo: 'Sára', text: 'Výborně, posílám potvrzení SMS. Můžu poprosit jméno?' },
  { t: 29, kdo: 'zákazník', text: 'Novák.' },
  { t: 31, kdo: 'Sára', text: 'Děkuji, pane Nováku, zítra v deset vám zavolá. Hezký den.' },
];
