import React from "react";

import type {ModularPageSection} from "./types";

import Heading from "../shared/heading";
import Body from "../shared/typography/body";

export default function Assurance(
  props: ModularPageSection<"section.assurance">,
) {
  return (
    <section
      {...props.rootHtmlAttributes}
      className="mx-auto flex w-full max-w-max-screen flex-col items-center justify-start gap-4xl px-m py-2xl lg:px-xl"
    >
      {props.title && (
        <Heading desktopSize="3xl" mobileSize="xl" tag="h3">
          {props.title}
        </Heading>
      )}
      <div className="flex w-full flex-col justify-between gap-m lg:flex-row lg:gap-2xl">
        {props.cards?.map((card) => (
          <Item
            description={card.description}
            key={card._key}
            title={card.title}
          />
        ))}
      </div>
    </section>
  );
}

function Item({
  description,
  title,
}: {
  description: string | undefined;
  title: string | undefined;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-xs text-center lg:max-w-[400px]">
      <Heading mobileSize="base" tag="h5">
        {title}
      </Heading>
      <Body font="sans" mobileSize="base">
        {description}
      </Body>
    </div>
  );
}