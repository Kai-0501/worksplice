const EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isSafeHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isSafeEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value) && !/[\r\n]/.test(value);
}

export function isSafeHref(value: string): boolean {
  if (value.startsWith("#") || value.startsWith("/")) {
    return !value.startsWith("//") && !/[\r\n]/.test(value);
  }

  if (value.startsWith("mailto:")) {
    const address = value.slice("mailto:".length).split("?")[0] ?? "";
    return isSafeEmail(decodeURIComponent(address));
  }

  return isSafeHttpsUrl(value);
}

export function requireHttpsUrl(value: string, field: string): string {
  if (!isSafeHttpsUrl(value)) {
    throw new Error(`${field} must be an https URL`);
  }
  return value;
}

export function requireEmail(value: string, field: string): string {
  if (!isSafeEmail(value)) {
    throw new Error(`${field} must be a valid email address`);
  }
  return value;
}
