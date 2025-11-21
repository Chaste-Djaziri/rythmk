'use server'

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    const apiKey = process.env.NEXT_PUBLIC_SLEZY_API_KEY
    const listIds = process.env.NEXT_PUBLIC_SLEZY_LIST_IDS || process.env.NEXT_PUBLIC_SLEZY_LIST_ID // Support both plural and singular
    
    if (!apiKey) {
      console.error('Selzy API key is not configured')
      return { success: false, error: 'Newsletter service is not configured. Please contact support.' }
    }

    if (!listIds) {
      console.error('Selzy list IDs are not configured')
      return { success: false, error: 'Newsletter list is not configured. Please add NEXT_PUBLIC_SLEZY_LIST_IDS to your environment variables.' }
    }

    // Build URL with query parameters according to Selzy API documentation
    // Format: https://api.selzy.com/en/api/subscribe?format=json&api_key=KEY&list_ids=ID&fields[email]=EMAIL
    const baseUrl = 'https://api.selzy.com/en/api/subscribe'
    const params = new URLSearchParams({
      format: 'json',
      api_key: apiKey,
      list_ids: listIds,
      'fields[email]': email,
      double_optin: '3', // 3 = add contact without sending confirmation email (consent already obtained)
      overwrite: '0', // 0 = only add new fields/tags, keep existing ones
    })

    const url = `${baseUrl}?${params.toString()}`

    // Selzy API accepts GET requests with query parameters
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    })

    const responseText = await response.text()
    let data: any = null

    // Try to parse JSON response
    try {
      data = JSON.parse(responseText)
    } catch {
      data = { raw: responseText }
    }

    // Log response for debugging
    console.log('Selzy API response:', {
      status: response.status,
      statusText: response.statusText,
      data: data
    })

    if (response.ok && data?.result?.person_id) {
      // Success - contact was added
      return { 
        success: true, 
        message: 'Thank you for subscribing! You have been added to our newsletter.' 
      }
    } else {
      // Handle errors from Selzy API
      const errorMessage = data?.error || `Failed to subscribe. Status: ${response.status}`
      
      // Log detailed error for debugging
      console.error('Selzy API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        data: data
      })
      
      // Check if contact already exists (common error messages)
      if (
        errorMessage.toLowerCase().includes('already exist') ||
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('duplicate')
      ) {
        return { 
          success: true, 
          message: 'You are already subscribed! Thank you for your interest.' 
        }
      }
      
      // Handle 403 Forbidden
      if (response.status === 403) {
        return { 
          success: false, 
          error: 'Access denied (403). Please verify your API key and list IDs are correct in your environment variables.' 
        }
      }
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        return { 
          success: false, 
          error: 'Authentication failed. Please check your API key configuration.' 
        }
      }
      
      return { 
        success: false, 
        error: errorMessage || 'Failed to subscribe. Please try again later.' 
      }
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.' 
    }
  }
}
