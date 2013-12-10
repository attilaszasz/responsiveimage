responsiveimage
===============

ResponsiveImage jQuery Plugin

Example usage:

<div class="responsive">
  <img alt="Responsive Demo" data-src-large="http://lorempixel.com/1600/800/city/1/Retina/" data-src-normal="http://lorempixel.com/800/400/city/1/Mid-Res/" data-src-small="http://lorempixel.com/200/100/city/1/Low-Res/" height="400" width="800" />
</div>

<script>
  $(document).ready(function () {
      $(".responsive img").ResponsiveImage({ minResponseTimeMS: 500 });
  });
</script>



Example for Asp.Net MVC Razor helper:

            @(Html.ResponsiveImage("http://lorempixel.com/200/100/city/1/Low-Res/")
                    .ImageAlt("Responsive Demo")
                    .Width(800)
                    .Height(400)
                    .SrcNormal("http://lorempixel.com/800/400/city/1/Mid-Res/")
                    .SrcLarge("http://lorempixel.com/1600/800/city/1/Retina/"))
