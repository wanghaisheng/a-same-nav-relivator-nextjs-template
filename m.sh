#!/bin/bash

# 迁移 primitives 基础组件（根据详细清单）
echo "迁移基础组件到 src/new-ui/primitives ..."
primitives=(
  accordion.tsx carousel.tsx dateTime-input.tsx file-upload.tsx multi-selector.tsx phone-input.tsx progress-carousel.tsx slider.tsx tab.tsx tags-input.tsx
  vaul-header.tsx vaul-main.tsx vaul-sidebar.tsx
  aspect-ratio.tsx badge.tsx button.tsx calendar.tsx command.tsx dialog.tsx drawer.tsx dropdown.tsx form.tsx hover-card.tsx input.tsx label.tsx navigation-menu.tsx popover.tsx scroll-area.tsx tabs.tsx toast.tsx github.tsx x.tsx
)
# core 下的 primitives
for file in accordion.tsx carousel.tsx dateTime-input.tsx file-upload.tsx multi-selector.tsx phone-input.tsx progress-carousel.tsx slider.tsx tab.tsx tags-input.tsx; do
  if [ -f "ui-layout/components/core/$file" ]; then
    cp "ui-layout/components/core/$file" "src/new-ui/primitives/$file"
    echo "已迁移: $file"
  fi
done
# drawer 子文件
for file in vaul-header.tsx vaul-main.tsx vaul-sidebar.tsx; do
  if [ -f "ui-layout/components/core/drawer/$file" ]; then
    cp "ui-layout/components/core/drawer/$file" "src/new-ui/primitives/$file"
    echo "已迁移: $file (drawer)"
  fi
done
# modal/dialog.tsx
if [ -f "ui-layout/components/core/modal/dialog.tsx" ]; then
  cp "ui-layout/components/core/modal/dialog.tsx" "src/new-ui/primitives/dialog.tsx"
  echo "已迁移: dialog.tsx (modal)"
fi
# website/ui primitives
for file in aspect-ratio.tsx badge.tsx button.tsx calendar.tsx command.tsx dialog.tsx drawer.tsx dropdown.tsx form.tsx hover-card.tsx input.tsx label.tsx navigation-menu.tsx popover.tsx scroll-area.tsx slider.tsx tabs.tsx toast.tsx; do
  if [ -f "ui-layout/components/website/ui/$file" ]; then
    cp "ui-layout/components/website/ui/$file" "src/new-ui/primitives/$file"
    echo "已迁移: $file (website/ui)"
  fi
done
# website/icons
for file in github.tsx x.tsx; do
  if [ -f "ui-layout/components/website/icons/$file" ]; then
    cp "ui-layout/components/website/icons/$file" "src/new-ui/primitives/$file"
    echo "已迁移: $file (icons)"
  fi
done

# 迁移 composites 复合组件

echo "迁移复合组件到 src/new-ui/composites ..."
composites=(
  animated-beam.tsx blocks.tsx blur-vignette.tsx cursor-follow-text.tsx framer-timeline.tsx image-tabs.tsx liquid-gradient.tsx main-spotlight.tsx marquee.tsx mousetrail.tsx numbersuffle.tsx scroll-element.tsx scroll-text-marque.tsx scroll-text.tsx spotlight.tsx text-randomized.tsx tooltip-doc.tsx
  preview-tab.tsx
  footer.tsx header.tsx moibile-header.tsx searchbar.tsx sidebar.tsx tableof-compoents.tsx theme-provider.tsx theme-switch.tsx
  hero-animated-btn.tsx hero-sec.tsx home-3d-blob.tsx home-accordion-modal.tsx home-accordion.tsx home-beam.tsx home-btn.tsx home-carousel.tsx home-clippath.tsx home-datetime-picker.tsx home-drag-items.tsx home-file-upload.tsx home-footer.tsx home-header-dropdown.tsx home-header.tsx home-hover-card.tsx home-image-modal.tsx home-image-reveal.tsx home-magnified-doc.tsx home-mousetrail.tsx home-password.tsx home-phone-input.tsx home-range-slider.tsx home-stacking-card.tsx home-tab.tsx home-text-marque.tsx home-youtube-tags.tsx new-items-loading.tsx progress-carousel.tsx
  component-section.tsx labs-sidebar.tsx
  code-block.tsx component-block.tsx component-code-preview.tsx component-preview.tsx copy-button.tsx copy-npm-button.tsx drawer-code-preview.tsx drawer-components-edit.tsx iframe-component-preview.tsx iframe-tab-codepreview.tsx pagination.tsx pre-code.tsx pre-coded.tsx react-runner-component-edit.tsx tab-codepreview.tsx
)
# core 下的 composites
for file in animated-beam.tsx blocks.tsx blur-vignette.tsx cursor-follow-text.tsx framer-timeline.tsx image-tabs.tsx liquid-gradient.tsx main-spotlight.tsx marquee.tsx mousetrail.tsx numbersuffle.tsx scroll-element.tsx scroll-text-marque.tsx scroll-text.tsx spotlight.tsx text-randomized.tsx tooltip-doc.tsx; do
  if [ -f "ui-layout/components/core/$file" ]; then
    cp "ui-layout/components/core/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (core)"
  fi
done
# labs
for file in preview-tab.tsx; do
  if [ -f "ui-layout/components/labs/$file" ]; then
    cp "ui-layout/components/labs/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (labs)"
  fi
done
# website composites
for file in footer.tsx header.tsx moibile-header.tsx searchbar.tsx sidebar.tsx tableof-compoents.tsx theme-provider.tsx theme-switch.tsx; do
  if [ -f "ui-layout/components/website/$file" ]; then
    cp "ui-layout/components/website/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (website)"
  fi
done
# website/home composites
for file in hero-animated-btn.tsx hero-sec.tsx home-3d-blob.tsx home-accordion-modal.tsx home-accordion.tsx home-beam.tsx home-btn.tsx home-carousel.tsx home-clippath.tsx home-datetime-picker.tsx home-drag-items.tsx home-file-upload.tsx home-footer.tsx home-header-dropdown.tsx home-header.tsx home-hover-card.tsx home-image-modal.tsx home-image-reveal.tsx home-magnified-doc.tsx home-mousetrail.tsx home-password.tsx home-phone-input.tsx home-range-slider.tsx home-stacking-card.tsx home-tab.tsx home-text-marque.tsx home-youtube-tags.tsx new-items-loading.tsx progress-carousel.tsx; do
  if [ -f "ui-layout/components/website/home/$file" ]; then
    cp "ui-layout/components/website/home/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (website/home)"
  fi
done
# website/labs composites
for file in component-section.tsx labs-sidebar.tsx; do
  if [ -f "ui-layout/components/website/labs/$file" ]; then
    cp "ui-layout/components/website/labs/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (website/labs)"
  fi
done
# website/code-components composites
for file in code-block.tsx component-block.tsx component-code-preview.tsx component-preview.tsx copy-button.tsx copy-npm-button.tsx drawer-code-preview.tsx drawer-components-edit.tsx iframe-component-preview.tsx iframe-tab-codepreview.tsx pagination.tsx pre-code.tsx pre-coded.tsx react-runner-component-edit.tsx tab-codepreview.tsx; do
  if [ -f "ui-layout/components/website/code-components/$file" ]; then
    cp "ui-layout/components/website/code-components/$file" "src/new-ui/composites/$file"
    echo "已迁移: $file (website/code-components)"
  fi
done

# 迁移 business 业务组件（如有，可补充）
# 示例：home-buyme-coffe.tsx
if [ -f "ui-layout/components/website/home/home-buyme-coffe.tsx" ]; then
  cp "ui-layout/components/website/home/home-buyme-coffe.tsx" "src/new-ui/business/home-buyme-coffe.tsx"
  echo "已迁移: home-buyme-coffe.tsx (business)"
fi

echo "迁移完成。请手动检查依赖、类型声明和导出文件，并进行API统一与文档补充。"