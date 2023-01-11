import React, {useState, useEffect} from "react"
import {Button, Flex, Alert} from '@strapi/design-system'
import {Check, Cross} from '@strapi/icons'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const API_TOKEN = `1819ff232c5daeb5e6cb0326a7cb48d8a2870596e550f743643184cade5f8e203c20bbcd972e8d18a43e9ed93745b9f07ea091634fe4f1adc631a7f12d7d8a95e3ed377088f8d13219871b9550afc0ca708edd7f61b34532dba4e107e0c957f721dbb40a18c957b1446540f760f823e52121f09d60e897908a04e7d846e519d4`;

interface MealAttributes {
  social_media_post: string,
  status: 'new' | 'review' | 'accepted' | 'rejected'
}

interface Meal {
  id: number,
  attributes: MealAttributes
}

function getId(location: Location): number | null {
  const match = location.pathname.match(/api::meal.meal\/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function fixOrigin(origin: string): string {
  return origin.replace(/8000/, '1337');
}

export function ReviewButtons(args) {
  console.log("args", args, arguments);
  const confirmReward = () => {
    console.log("confirmReward");

    const id: number | null = getId(location);

    axios.put<Meal, AxiosResponse<Meal>, { data: Partial<MealAttributes> }>(`${fixOrigin(location.origin)}/api/meals/${id}`, {
      data: {
        status: 'accepted'
      }
    }, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    } as AxiosRequestConfig<any>).then((res) => {
      console.log("res", res);
      location.reload();
    })

  }

  const rejectReward = () => {
    console.log("rejectReward");

    const id: number | null = getId(location);

    axios.put<Meal, AxiosResponse<Meal>, { data: Partial<MealAttributes> }>(`${fixOrigin(location.origin)}/api/meals/${id}`, {
      data: {
        status: 'rejected'
      }
    }, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    } as AxiosRequestConfig<any>).then((res) => {
      console.log("res", res);
      location.reload();
    })
  }

  if (args.slug === 'api::meal.meal') {

    console.log("location", location);

    const id: number | null = getId(location);

    console.log("id", id);

    const [meal, setMeal] = useState<Meal>({
      id,
      attributes: {
        social_media_post: "",
        status: 'new'
      }
    });

    console.log("process.env", process.env);
    console.log("API_TOKEN", API_TOKEN);

    useEffect(() => {

      axios.get(`${fixOrigin(location.origin)}/api/meals/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      } as AxiosRequestConfig<any>).then((res) => {
        console.log("res", res);
        setMeal(res.data.data);
      })

    }, []);

// ["default","tertiary","secondary","danger","success","ghost","success-light","danger-light"]
    return (
      <Flex justifyContent={'between'}>
        {meal.attributes.social_media_post && meal.attributes.status === 'review' && <Button
          onClick={confirmReward}
          variant='default'
          endIcon={<Check/>}
          className={'mr-2'}
        >
          Confirm
        </Button>}

        {meal.attributes.social_media_post && meal.attributes.status === 'review' && <Button
          onClick={rejectReward}
          variant='danger'
          endIcon={<Cross/>}
        >
          Reject
        </Button>}
      </Flex>
    )

  } else {
    return <></>
  }
}

function Info() {
  const [infoClosed, setInfoClosed] = useState(false);

  function closeInfo() {
    setInfoClosed(true);
  }

  return <>{!infoClosed && <Alert closeLabel="Close alert" onClose={closeInfo} className={'mt-3'}>Custom admin works.</Alert>}</>
}

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app) {
    console.log(app);
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'my-compo', Component: ReviewButtons
    });
    app.injectContentManagerComponent('editView', 'informations', {
      name: 'my-info', Component: Info
    });
  },
};
