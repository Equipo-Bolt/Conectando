export function getDefaultRouteForRole(roleId: number) {
  if (roleId === 0) {
    return "/403";
  } else if (roleId === 1) {
    return "/misObjetivos";
  } else if (roleId === 2 || roleId === 4) {
    return "/misColaboradores";
  } else {
    return "/usuarios";
  }
}
