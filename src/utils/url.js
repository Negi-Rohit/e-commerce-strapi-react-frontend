const API_URL = process.env.PUBLIC_URL || "http://localhost:1337";

const MAGIC_KEY = process.env.PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_AC4227EEB2CB9E56";

const STRIPE_PK = process.env.PUBLIC_STRIPE_PK || "pk_test_51J5AwVSDJPX8mMypkfi9zwlJiVN8ybhcVqggrRds6CIv9nEHdhf22ue4oJUkpeoMjykGaIQdmoEImykjyRWrfpUe00WcxSG6rf";

const imageUrl = (image) => {
    if(image.url.indexOf("/") === 0){
        return `${API_URL}${image.url}`
    }
    return image.url;
} 

export { API_URL, MAGIC_KEY, STRIPE_PK, imageUrl };