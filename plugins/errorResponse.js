export default function (ctx, inject) {
  const errorResponse = (e) => {
    let errors = null
    let message = ''

    if (e.response?.data) {
      if (e.response.data?.errors) {
        errors = e.response.data.errors
      } else if (e.response.data.message) {
        message = e.response.data.message
      }
    }

    return { errors, message }
  }
  const errorMessage = (e) => {
    let message

    if (e.response?.data?.message) {
      message = e.response.data.message
    } else if (e.response?.message) {
      message = e.response.message
    } else {
      message = e.message
    }

    return message
  }

  inject('errorResponse', errorResponse)
  inject('errorMessage', errorMessage)
}
