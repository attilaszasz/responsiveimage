using System.Globalization;
using System.Web;
using System.Web.Mvc;

namespace Helpers
{
    public static class ImageHelper
    {
        public static ResponsiveImage ResponsiveImage(this HtmlHelper htmlHelper, string src)
        {
            return new ResponsiveImage(src);
        }
    }

    public class ResponsiveImage : IHtmlString 
    {
        private readonly string _srcSmall;
        private string _srcNormal;
        private string _srcLarge;
        private string _alt = string.Empty;
        private int _width = 100;
        private int _height = 100;

        public ResponsiveImage(string srcSmall)
        {
            _srcSmall = srcSmall;
            _srcNormal = srcSmall;
            _srcLarge = srcSmall;
        }

        public ResponsiveImage SrcNormal(string srcNormal)
        {
            _srcNormal = srcNormal;
            return this;
        }

        public ResponsiveImage SrcLarge(string srcLarge)
        {
            _srcLarge = srcLarge;
            return this;
        }

        public ResponsiveImage ImageAlt(string alt)
        {
            _alt = alt;
            return this;
        }

        public ResponsiveImage Width(int width)
        {
            _width = width;
            return this;
        }

        public ResponsiveImage Height(int height)
        {
            _height = height;
            return this;
        }

        public override string ToString()
        {
            TagBuilder imgBuilder = new TagBuilder("img");
            imgBuilder.MergeAttribute("data-src-small", _srcSmall);
            imgBuilder.MergeAttribute("alt", _alt);
            imgBuilder.MergeAttribute("data-src-normal", _srcNormal);
            imgBuilder.MergeAttribute("data-src-large", _srcLarge);
            imgBuilder.MergeAttribute("width", _width.ToString(CultureInfo.InvariantCulture));
            imgBuilder.MergeAttribute("height", _height.ToString(CultureInfo.InvariantCulture));

            TagBuilder divBuilder = new TagBuilder("div");
            divBuilder.AddCssClass("responsive");
            divBuilder.InnerHtml = imgBuilder.ToString(TagRenderMode.SelfClosing);
            return divBuilder.ToString(TagRenderMode.Normal);
        }

        public string ToHtmlString()
        {
            return ToString();
        }
    }
}