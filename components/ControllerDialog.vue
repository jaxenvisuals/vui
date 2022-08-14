<template>
  <div class="absolute p-4 pointer-events-auto" :class="[positionCss]">
    <div class="bg-white rounded-md shadow-md w-72">
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <p class="text-base font-bold">Controller</p>

        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <ASmallButton
              v-for="pos in positions"
              :key="pos.key"
              :icon="pos.icon"
              @click="currentPosition = pos.key"
            />
          </div>

          <div class="w-px border-l h-[25px]"></div>

          <ASmallButton :icon="'menu'" @click="toolsVisible = !toolsVisible" />
        </div>
      </div>

      <div v-if="toolsVisible">
        <div class="flex flex-wrap gap-2 p-4 pt-2 border-b fon">
          <p class="w-full mb-px text-xs leading-none">Trigger</p>

          <APillButton
            v-for="trigger in triggers"
            :key="trigger.key"
            :name="trigger.name"
            :selected="selectedTrigger.key === trigger.key"
            @click="selectedTrigger = trigger"
          />
        </div>

        <div
          v-if="selectedTrigger.needElement"
          class="flex flex-wrap gap-2 p-4 pt-2 border-b"
        >
          <p class="w-full mb-px text-xs leading-none">Element</p>

          <APillButton
            v-for="element in elements"
            :key="element.key"
            :name="element.name"
            :selected="selectedElement.key === element.key"
            @click="selectElement(element)"
          />
        </div>

        <div
          v-show="selectedElement.key"
          class="flex items-center justify-between p-4 border-b"
        >
          <p class="text-xs font-bold">On Cell</p>

          <input
            ref="cellInput"
            v-model="cell"
            type="text"
            class="w-4/12 p-1 text-sm font-bold border rounded-sm"
            placeholder="e.g. C4"
          />
        </div>

        <div class="p-4">
          <button
            class="flex items-center justify-center w-full p-1 font-bold text-white bg-blue-500 border rounded-md hover:bg-blue-600"
            @click.prevent="runSim"
          >
            <span class="text-xl font-extrabold material-symbols-outlined">
              play_circle
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ASmallButton from './ASmallButton.vue'
import APillButton from './APillButton.vue'

export default {
  name: 'ControllerDialog',

  components: { ASmallButton, APillButton },

  data() {
    return {
      toolsVisible: true,
      currentPosition: 'bottom-left',
      positions: [
        {
          icon: 'north_west',
          key: 'top-left',
        },
        {
          icon: 'north_east',
          key: 'top-right',
        },
        {
          icon: 'south_west',
          key: 'bottom-left',
        },
        {
          icon: 'south_east',
          key: 'bottom-right',
        },
      ],
      triggers: [
        {
          name: 'Click',
          key: 'click',
          needElement: true,
        },
        {
          name: 'Scroll',
          key: 'scroll',
          needElement: false,
        },
        {
          name: 'Play',
          key: 'play',
          needElement: true,
        },
        {
          name: 'Pause',
          key: 'pause',
          needElement: true,
        },
        {
          name: 'Copy',
          key: 'copy',
          needElement: true,
        },
        {
          name: 'Paste',
          key: 'paste',
          needElement: true,
        },
      ],
      elements: [
        {
          name: 'Button',
          key: 'button',
        },
        {
          name: 'Link',
          key: 'link',
        },
        {
          name: 'Image',
          key: 'image',
        },
        {
          name: 'Video',
          key: 'video',
        },
        {
          name: 'Text',
          key: 'text',
        },
      ],

      cell: null,
      selectedTrigger: {},
      selectedElement: {},
    }
  },

  computed: {
    positionCss() {
      let position = ''
      switch (this.currentPosition) {
        case 'bottom-left':
          position = 'bottom-0 left-0'
          break
        case 'bottom-right':
          position = 'bottom-0 right-0'
          break
        case 'top-left':
          position = 'top-0 left-0'
          break
        case 'top-right':
          position = 'top-0 right-0'
          break

        default:
          break
      }

      return position
    },
  },

  methods: {
    selectElement(element) {
      this.selectedElement = element
      setTimeout(() => {
        this.$refs.cellInput.focus()
      }, 200)
    },

    runSim() {
      this.$store.dispatch('touch/findElementsInCell', {
        cellNumber: this.cell,
        trigger: this.selectedTrigger,
        element: this.selectedElement,
      })
    },
  },
}
</script>
