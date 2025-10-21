/**
 * Calcula los años completos de experiencia desde un mes/año hasta hoy.
 * @param startDate Fecha de inicio en formato "MM/YYYY"
 * @returns Años completos de experiencia (0 si la fecha es inválida o futura)
 */
export function getYearsOfExperience(startDate: string): number {
  const [startMonth, startYear] = startDate.split("/").map(Number);
  const now = new Date();
  const years = now.getFullYear() - startYear;

  return now.getMonth() + 1 >= startMonth ? years : years - 1;
}
