/**
 * Device Trust Utility Functions
 * 
 * Manages trusted devices for MFA bypass using localStorage.
 * When a user successfully verifies MFA and chooses to "trust this device",
 * a token is stored that allows skipping MFA on subsequent logins.
 * 
 * Clearing browser cache/localStorage will revoke trust and require MFA again.
 */

const DEVICE_TRUST_KEY = 'portfolio_admin_device_trust';
const DEVICE_TRUST_TIMESTAMP_KEY = 'portfolio_admin_device_trust_timestamp';

// Trust duration: 30 days (in milliseconds)
const TRUST_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Checks if the current device is trusted for MFA bypass
 * @returns boolean - true if device is trusted and within validity period
 */
export function isDeviceTrusted(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const token = localStorage.getItem(DEVICE_TRUST_KEY);
        const timestamp = localStorage.getItem(DEVICE_TRUST_TIMESTAMP_KEY);

        if (!token || !timestamp) return false;

        // Check if trust has expired (30 days)
        const trustTime = parseInt(timestamp, 10);
        const now = Date.now();

        if (now - trustTime > TRUST_DURATION_MS) {
            // Trust expired, clean up
            revokeDeviceTrust();
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Marks the current device as trusted for MFA bypass
 * Generates a unique token and stores it with a timestamp
 */
export function trustDevice(): void {
    if (typeof window === 'undefined') return;

    try {
        const token = crypto.randomUUID();
        localStorage.setItem(DEVICE_TRUST_KEY, token);
        localStorage.setItem(DEVICE_TRUST_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.error('Failed to trust device:', error);
    }
}

/**
 * Removes device trust, requiring MFA on next login
 */
export function revokeDeviceTrust(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(DEVICE_TRUST_KEY);
        localStorage.removeItem(DEVICE_TRUST_TIMESTAMP_KEY);
    } catch (error) {
        console.error('Failed to revoke device trust:', error);
    }
}

/**
 * Gets the trust expiration date for display purposes
 * @returns Date object or null if not trusted
 */
export function getDeviceTrustExpiration(): Date | null {
    if (typeof window === 'undefined') return null;

    try {
        const timestamp = localStorage.getItem(DEVICE_TRUST_TIMESTAMP_KEY);
        if (!timestamp) return null;

        const trustTime = parseInt(timestamp, 10);
        return new Date(trustTime + TRUST_DURATION_MS);
    } catch {
        return null;
    }
}
