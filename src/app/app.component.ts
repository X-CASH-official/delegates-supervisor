import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})
export class AppComponent {


  loading:boolean = true;
  baseURL:string= environment.baseURL == '' ? window.location.origin : environment.baseURL;
  metaImage:string= this.baseURL + "/assets/icons/apple-touch-icon-180x180.png";
  static storageKey = 'xcash-explorer-theme-preference';


  getRouteAnimation(outlet) {

      return outlet.activatedRouteData.animation
  }

  constructor(private router: Router,  private meta: Meta) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit()  {

    this.router.events.subscribe((event) => {

      if(event instanceof NavigationStart) {
        this.loading = true;
      }else if(event instanceof NavigationEnd) {
        this.loading = false;

        //override default meta tags
        this.meta.updateTag({ property: 'og:url', content: this.baseURL  });
        this.meta.updateTag({ property: 'og:image', content: this.metaImage  });
        this.meta.updateTag({ name: 'twitter:domain', value: this.baseURL  });
        this.meta.updateTag({ name: 'twitter:url', value: window.location.href  });
        this.meta.updateTag({ name: 'twitter:image', content: this.metaImage  });
      }

      window.scrollTo(0, 0);
    });

    var theme = window.localStorage.getItem('xcash-explorer-theme-preference');
    if (theme) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("dark-theme","light-theme","unicorn-theme","darksea-theme");   //remove theme class
      body.classList.add(theme + "-theme");   //add selected theme
    }

  }
}
