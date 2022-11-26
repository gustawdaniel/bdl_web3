import 'dotenv/config'
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

import fs from 'fs';
import {templates} from 'jsrender';
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
    '36881878', //    Admeal Github Actions Deployment ( gustawdaniel )    51:39:ab:df:44:45:2c:5a:c8:cb:27:58:68:29:84:3d
    '36881874', //    Daniel Gustaw Hyperbook                              b1:8b:4d:cf:59:58:0a:8d:a3:f0:2f:18:28:e1:19:72
  ]
};

const droplet = new digitalocean.Droplet("bdl-web3", dropletConfig);

export const ip = droplet.ipv4Address;
