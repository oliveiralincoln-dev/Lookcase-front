// Frações da altura do hero onde começa o preto (a mais baixa das duas curvas)
// sob cada zona da navbar (x≈5%, 50%, 92%). Mantém navbar e hero sincronizados:
// se mudar RIBBON_DESKTOP/RIBBON_MOBILE em app/page.tsx, recalcule aqui.
export const HERO_NAV_ZONES = {
  desktop: { left: 0.824, mid: 0.75, right: 0.619 },
  mobile: { left: 0.91, mid: 0.79, right: 0.761 },
}
