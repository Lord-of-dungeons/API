import { Request } from "express";

export const parseUserAgent = (request: Request) => {
  const ua = request.headers["user-agent"];
  let $ = { active: false, subactive: false } as { [key: string]: any };

  if (/mobile/i.test(ua)) {
    $.active = "mobile";
    $.Mobile = true;
  }

  if (/like Mac OS X/.test(ua)) {
    $.active = "iOS";
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, ".");
    if (/like Mac OS X/.test(ua)) {
      $.subactive = "iPhone";
      $.iPhone = /iPhone/.test(ua);
    }
    if (/like Mac OS X/.test(ua)) {
      $.subactive = "iPad";
      $.iPad = /iPad/.test(ua);
    }
  }

  if (/Android/.test(ua)) {
    $.active = "Android";
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
  }

  if (/webOS\//.test(ua)) {
    $.active = "webOS";
    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
  }

  if (/(Intel|PPC) Mac OS X/.test(ua)) {
    $.active = "Safari";
    $.Safari = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, ".") || true;
  }

  if (/Windows NT/.test(ua)) {
    $.active = "IE";
    $.IE = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
  }
  if (/MSIE/.test(ua)) {
    $.active = "IE";
    $.IE = /MSIE ([0-9]+[\.0-9]*)/.exec(ua)[1];
  }
  if (/Trident/.test(ua)) {
    $.active = "IE";
    $.IE = /Trident\/.*rv:([0-9]+[\.0-9]*)/.exec(ua)[1];
  }
  if (/Edge\/\d+/.test(ua)) {
    $.active = "IE Edge";
    $.IE = /Edge\/(\d+)/.exec(ua)[1];
  }

  return $.active ? $.active + " " + $[$.active] + ($.subactive && " " + $.subactive + " " + $[$.subactive]) : ua;
};
