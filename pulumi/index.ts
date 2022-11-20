import 'dotenv/config'

import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

import fs from 'fs';
import {render, templates} from 'jsrender';
const userDataTemplate = fs.readFileSync('./userData.sh').toString();

const userData = templates(userDataTemplate).render(process.env)

const dropletConfig = {
  image: "docker-20-04",
  region: "fra1",
  size: "s-1vcpu-1gb-intel",
  monitoring: true,
  backups: false,
  userData,
  sshKeys: [
    '36403277', //    Daniel Hyperbook          b1:8b:4d:cf:59:58:0a:8d:a3:f0:2f:18:28:e1:19:72
    '34336169', //    Daniel Laptop Dell        29:45:4a:46:33:ca:d4:d7:08:7c:9d:12:fc:35:1d:f5
    '32795472', //    Daniel MacBook Pro        a4:ce:ed:f5:89:f2:30:ce:48:cc:52:47:03:50:41:4e
    '30086379', //    Gitlab                    86:1a:3c:37:02:f4:24:71:1e:aa:0a:20:8d:8a:78:a0
    '29143865', //    Daniel Old Laptop Dell    ea:63:a5:ab:df:7d:92:44:fa:33:c5:16:24:32:28:d8
    '28187328', //    Daniel Lenovo Yoga        35:f6:46:67:ce:c2:3a:67:19:39:2a:98:74:0d:55:b2
    '27483108', //    Daniel Stacjonarny        4f:ce:1e:10:28:ea:64:fb:cd:a0:b4:ce:c4:79:30:2f
    '34802348', //    Yoga 2022                 8e:0b:7f:31:48:1d:ea:0f:22:f8:ce:d8:28:27:c3:88
  ]
};

const droplet = new digitalocean.Droplet("bdl-web3", dropletConfig);

export const ip = droplet.ipv4Address;
