---
title: State of London Report
description: The 2026 edition of London's key report on it's economy and society
section: Foreword
navLabel: Home
---

<script>
    import { Button, PlaceholderImage } from '@ldn-viz/ui';
    import { resolve } from '$app/paths';
</script>

<div class="grid grid-cols-2 gap-4">
    <div>
        <div class="h-60 block">
            <PlaceholderImage />
        </div>
        <h3 class="title-md format">A review of London's economy and society.</h3>
        <p class="pb-4"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis ac risus sodales egestas. Phasellus pulvinar lacus placerat, laoreet augue non, tincidunt ligula. Nunc nec erat at lectus viverra pellentesque eu sit amet tellus. Cras lacinia blandit egestas. Vestibulum interdum est et libero placerat, eget aliquam sapien consequat. Morbi a urna neque. Morbi sit amet enim libero. Nam rhoncus suscipit arcu id tempus. Vestibulum id faucibus augue. Nam semper, velit nec auctor iaculis, urna ante blandit elit, ut ornare enim lorem in nibh. Sed cursus id mauris vitae luctus.

</p>
        <Button href={resolve("/report")} variant="outline">Read the report</Button>
    </div>
</div>
