export interface Image {
    data: {
        attributes: {
            url: string
            formats?: {
                medium?: {
                    url: string
                },
                thumbnail?: {
                    url: string
                }
            }
        }
    } | null
}

export interface User {
    id: number,
    email: string
    first_name: string,
    last_name: string,
    wallet_address: string
    wallet_type: 'metamask' | 'coinbase' | 'custom'
}

export interface Nutrition {
    id: number,
    name: string
    value: number
    unit: string
}

export interface RecipeAttributes {
    name: string
    cooking_time_value: number,
    dish_reward_for_cooking: number
    cooking_counter: number,
    cooking_time_unit: string
    short_description: string
    photo: Image
    nutrition: Nutrition[]
    ingredients: Nutrition[]
    instruction: string
}

export interface Recipe {
    id: number,
    attributes: RecipeAttributes
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

export function recipeImageUrl(recipe: RecipeAttributes, config: any): string {
    console.log("recipe", recipe);
    if(recipe.photo?.data && recipe.photo.data.attributes.formats?.medium) {
        return `${config.public.baseUrl}${recipe.photo.data.attributes.formats.medium.url}`;
    } else if(recipe.photo.data) {
        return `${config.public.baseUrl}${recipe.photo.data.attributes.url}`;
    } else {
        return '';
    }
}
