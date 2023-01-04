import NextLink, { LinkProps } from "next/link";
import React from "react";

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<LinkProps, "href" | "as" | "onClick" | "onMouseEnter"> {
  href: LinkProps["href"];
  as?: LinkProps["as"];
}

export const NextLinkComposed = ({
  as,
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...props
}: NextLinkComposedProps) => {
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
      passHref
      legacyBehavior
    >
      <a {...props} />
    </NextLink>
  );
};
