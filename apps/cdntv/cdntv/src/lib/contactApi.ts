/**
 * Contact Form API Module
 * 
 * Handles the communication between the frontend contact form
 * and the backend SMTP email endpoint.
 * 
 * Security features:
 * - Input sanitization (strips HTML tags to prevent XSS)
 * - Email format validation
 * - Header injection prevention
 * - Structured error handling
 */

// Backend API base URL — set NEXT_PUBLIC_API_URL in production
// Falls back to localhost:4000 for local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Sanitizes user input by removing HTML tags to prevent XSS attacks.
 * @param input - The raw user input string
 * @returns The sanitized string with HTML tags removed
 */
function sanitizeInput(input: string): string {
    return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validates email format using a standard regex pattern.
 * Also checks for header injection attempts (newlines in email).
 * @param email - The email address to validate
 * @returns True if the email is valid and safe
 */
function isValidEmail(email: string): boolean {
    // Check for header injection attempts (newlines)
    if (/[\r\n]/.test(email)) return false;
    // Standard email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Contact form data interface.
 * Maps the frontend form fields to the backend API expected format.
 */
export interface ContactFormData {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
}

/**
 * API response interface from the backend.
 */
export interface ContactApiResponse {
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Sends the contact form data to the backend API endpoint.
 * 
 * The backend handles:
 * - SMTP email sending via Nodemailer
 * - Rate limiting (5 requests per 15 minutes per IP)
 * - Server-side sanitization and validation
 * - Hardcoded destination email (ignores client-side 'to' field)
 * 
 * @param data - The sanitized contact form data
 * @returns Promise with the API response
 * @throws Error if the network request fails
 */
export async function sendContactForm(data: ContactFormData): Promise<ContactApiResponse> {
    // Sanitize all text inputs before sending
    const sanitizedData = {
        nome: sanitizeInput(`${data.firstName} ${data.lastName}`),
        email: sanitizeInput(data.email),
        empresa: sanitizeInput(data.company),
        telefone: sanitizeInput(data.phone),
        mensagem: sanitizeInput(data.message),
    };

    // Validate email format on the client side
    if (!isValidEmail(sanitizedData.email)) {
        return {
            success: false,
            error: 'Invalid email format.',
        };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData),
        });

        // Parse the JSON response from the backend
        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `Server error (${response.status}). Please try again later.`,
            };
        }

        return {
            success: true,
            message: result.message || 'Message sent successfully!',
        };
    } catch (error) {
        // Network error or server unreachable
        console.error('Contact form submission error:', error);
        return {
            success: false,
            error: 'Could not connect to the server. Please check your connection and try again.',
        };
    }
}
