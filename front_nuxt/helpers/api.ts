export interface Image {
    data: {
        attributes: {
            url: string
            formats?: {
                medium?: {
                    url: string
                }
            }
        }
    } | null
}

export interface Recipe {
    id: number,
    attributes: {
        name: string
        cooking_time_value: number,
        dish_reward_for_cooking: number
        cooking_counter: number,
        cooking_time_unit: string
        photo: Image
    }
}

export interface Meal {
    id: number
    attributes: {
        name: string,
        social_media_post?: string,
        dish_token: number,
        adm_token: number,
        recipe?: {data: Recipe},
        ingredients_image?: Image
        meal_image?: Image
    }
}

export function recipeImageUrl(recipe: Recipe, config: any): string {
    if(recipe.attributes.photo?.data && recipe.attributes.photo.data.attributes.formats?.medium) {
        return `${config.public.baseUrl}${recipe.attributes.photo.data.attributes.formats.medium.url}`;
    } else if(recipe.attributes.photo.data) {
        return `${config.public.baseUrl}${recipe.attributes.photo.data.attributes.url}`;
    } else {
        return '';
    }
}
