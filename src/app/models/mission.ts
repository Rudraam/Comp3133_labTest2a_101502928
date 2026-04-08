export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Links {
  mission_patch: string | null;
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Mission {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  details: string | null;
  launch_success: boolean | null;
  land_success: boolean | null;
  rocket: Rocket;
  links: Links;
  launch_site: LaunchSite;
  mission_id: string[];
}
