@props(['url'])
<tr>
    <td class="header">
        <div class="d-flex justify-content-between">
            <a href="{{ $url }}" style="display: inline-block;">
                <img src="{{ env('APP_URL') }}/logo.png" class="logo" alt="Ribara">
            </a>
        </div>
    </td>
</tr>
