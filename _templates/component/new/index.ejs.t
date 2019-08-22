---
to: src/components/<%= name %>/index.tsx
---
import * as React from "react";

interface I<%= name %>Props {

}

const <%= name %>: React.FC<I<%= name %>Props> = (props: I<%= name %>Props) => {
    return (
      <div>
          <%= name %> works!
      </div>
    );
};

export default <%= name %>;