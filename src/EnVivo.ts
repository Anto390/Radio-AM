const CLAVE = "estadoEnVivo";

export function activarEnVivo() {
  localStorage.setItem(CLAVE, "true");
  window.dispatchEvent(new Event("cambioEnVivo"));
}

export function desactivarEnVivo() {
  localStorage.setItem(CLAVE, "false");
  window.dispatchEvent(new Event("cambioEnVivo"));
}

export function estaEnVivo(): boolean {
  return localStorage.getItem(CLAVE) === "true";
}